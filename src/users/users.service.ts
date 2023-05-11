import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, IsNull, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserRole } from './entities/role.entity';
import { CreateResourceInput } from './dto/create-resource-input';
import { UserPaymentMethod } from './../modules/userPaymentMethods/entity/userPaymentMethod.entity';
import { RoleService } from './role.service';
import { AuthService } from './auth/auth.service';
import { CommonPayload } from './dto/common.dto';
import { UpdateResourceInput } from './dto/update-resource-input';
import { GetAllUsersInput } from './dto/get-all-users-input';
import { DashboardStatsPayload } from './dto/dashboard-stats.dto';
import { ResourceDashboardStatsPayload } from './dto/resource-dashboard-stats.dto';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { AzureBlobService } from 'src/azure-blob/azure-blob.service';
import { GetAllUsersStatsPayload } from './dto/get-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserPaymentMethod) private userPaymentMethodRepo: Repository<UserPaymentMethod>,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
    private readonly sendgridService: SendgridService,
    private readonly azureblobService: AzureBlobService
  ) { }

  async create(createUserInput: CreateUserInput) {
    try {
      const user = await this.userRepo.findOneBy({ email: createUserInput.email })
      const roleType = UserRole.RESOURCE;
      const role = await this.roleService.findByType(roleType);
      const password = createUserInput.email
      if (user) {
        throw new InternalServerErrorException("Email already exist");
      }
      const newUser = await this.userRepo.save({
        ...createUserInput,
        password,
        roles: [role]
      })
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllUsers(getAllUsersInput: GetAllUsersInput): Promise<GetAllUsersStatsPayload> {
    try {
      const { role, limit = 20, page = 0, searchQuery } = getAllUsersInput;

      const whereClause = {
        deletedAt: IsNull(),
        requestApproved: true,
        ...(role && { roles: { role } }),
      };

      const where = [
        { ...(searchQuery && { email: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { firstName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { lastName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { country: ILike(`%${searchQuery}%`) }), ...whereClause },

      ];

      const users = await this.userRepo.find({
        where,
        relations: { userPaymentMethod: true, roles: true, onboardedBy: true },
        skip: page * limit,
        take: limit
      });

      const count = await this.userRepo.count({ where })
      return {
        count,
        users
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.userRepo.findOneBy({ id });
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepo.findOneBy({ email });
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createResource(userId: string, createResourceInput: CreateResourceInput): Promise<CommonPayload> {

    const {
      accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, ...user
    } = createResourceInput;

    const alreadyExists = await this.userRepo.findOne({
      where: [
        { email: user.email },
      ]
    });

    if (alreadyExists) {
      throw new ConflictException('Resource already exists');
    };

    const currentUser = await this.userRepo.findOne({ where: { id: userId } })

    const roleType = UserRole.RESOURCE;
    const role = await this.roleService.findByType(roleType);
    const pass = (Math.random() * 1e16).toString(36);
    const newUser = await this.userRepo.save({
      ...user,
      ...(user.isOnboarded ? { onboardedAt: new Date(), onboardedBy: currentUser } : {}),
      password: pass,
      requestApproved: true,
      roles: [role],
    });

    if (accountType)
      await this.userPaymentMethodRepo.save({
        accountNumber, accountTitle, accountType, bankAddress, bankName,
        beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
        beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
        user: newUser
      })

    // const mail = {
    //   to: newUser.email,
    //   subject: 'Cogent Sign-In credentials.',
    //   from: 'admin@cogentnetworks.com',
    //   text: `Your Cogent account has been created. Please login with your email using this password ${pass}`,
    // };

    // await this.sendgridService.send(mail);

    return { message: "Resource Created Successfully!" };
  }

  async updateResource(currentUserId: string, id: string, updateResourceInput: UpdateResourceInput): Promise<CommonPayload> {

    const {
      accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, ...userData
    } = updateResourceInput;

    const user = await this.userRepo.findOne({ where: { id }, relations: { userPaymentMethod: true } });

    if (!user) throw new NotFoundException(`User with ${id} does not exist!`);

    const alreadyExists = await this.userRepo.findOne({
      where: [
        { email: userData?.email },
      ],
      select: { id: true }
    });

    if (alreadyExists?.id !== user?.id) {
      throw new ConflictException('Resource with this email already exists!');
    };

    if (userData?.isOnboarded && !user?.isOnboarded) {
      const currentUser = await this.userRepo.findOne({ where: { id: currentUserId } })
      user["onboardedAt"] = new Date();
      user["onboardedBy"] = currentUser;
    };

    Object.keys(userData).forEach((key) => { user[key] = userData[key] });
    user["requestApproved"] = user.requestApproved;

    if (!accountType) {
      user.userPaymentMethod = [];
    }

    await this.userRepo.save(user);

    if (accountType) {
      const paymentPayload = {
        accountNumber, accountTitle, accountType, bankAddress, bankName,
        beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
        beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
      };
      if (!user?.userPaymentMethod?.length) {
        await this.userPaymentMethodRepo.save({
          ...paymentPayload,
          user
        })
      }
      else {
        await this.userPaymentMethodRepo.update({
          userId: user.id
        }, {
          accountNumber, accountTitle, accountType, bankAddress, bankName,
          beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
          beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
        });
      }
    }

    return { message: "Info Updated Successfully!" };
  }

  async getResource(id: string) {
    const user = await this.userRepo.findOne(
      {
        where: { id, deletedAt: IsNull() },
        relations: { roles: true, userPaymentMethod: true, onboardedBy: true }
      }
    )
    if (!user) throw new NotFoundException(`User with ${id} does not exist!`)
    if (user.roles.find(item => item.role === "rms")) throw new NotFoundException(`Kindly provide correct resource id!`)
    return user
  };

  async deleteResource(id: string): Promise<CommonPayload> {
    await this.userRepo.update({ id }, { deletedAt: new Date() })
    return { message: "Resource Deleted Successfully!" };
  };

  async getLoggedInUserFromToken(auth: string) {
    try {
      const payload = await this.authService.verifyToken(auth);
      if (payload) {

        const result = await this.userRepo.findOne({
          select: { id: true, roles: { role: true } },
          relations: {
            roles: true
          },
          where: {
            id: payload.userId
          },
        });

        return {
          ...payload,
          roles: result?.roles?.map(item => item?.role) || []
        }
      }
      throw new UnauthorizedException('Invalid Authorization Token - No Token Provided in Headers');
    } catch (error) {
      throw error
    }

  }

  async getDashboardStats(): Promise<DashboardStatsPayload> {

    const startDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const endDate = new Date()

    const totalResourceCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        deletedAt: IsNull(),
      }
    });

    const newRequestCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        deletedAt: IsNull(),
        createdAt: Between(startDate, endDate),
        isARequest: true
      }
    });

    const newHiringCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        deletedAt: IsNull(),
        onboardedAt: Between(startDate, endDate),
        isOnboarded: true
      }
    });

    return {
      totalResourceCount,
      newRequestCount,
      newHiringCount
    }

  };

  async getResourceDashboardStats(): Promise<ResourceDashboardStatsPayload> {

    const lastMonthDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const twoMonthsBeforeDate = new Date(new Date().setMonth(new Date().getMonth() - 2));
    const currentDate = new Date()

    const getPercentage = (prevMonthValue: number, cuurentMonthValue: number): number => {
      const diff = cuurentMonthValue - prevMonthValue;
      if (prevMonthValue == 0) return cuurentMonthValue * 100;
      return +((diff / prevMonthValue) * 100).toFixed(2);
    };

    // Resource Count

    const totalResourceCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        deletedAt: IsNull(),
      }
    });

    const lastMonthResourceCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        deletedAt: IsNull(),
        createdAt: Between(twoMonthsBeforeDate, lastMonthDate),

      }
    });

    const currentMonthResourceCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        deletedAt: IsNull(),
        createdAt: Between(lastMonthDate, currentDate),

      }
    });

    const resourceDifference = getPercentage(lastMonthResourceCount, currentMonthResourceCount)

    // OnBoarding Count

    const totalOnboardedCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        isOnboarded: true,
        deletedAt: IsNull(),
      }
    });

    const lastMonthOnboardedCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        isOnboarded: true,
        deletedAt: IsNull(),
        createdAt: Between(twoMonthsBeforeDate, lastMonthDate),

      }
    });

    const currentMonthOnboardedCount = await this.userRepo.count({
      where: {
        roles: {
          role: UserRole.RESOURCE
        },
        isOnboarded: true,
        deletedAt: IsNull(),
        createdAt: Between(lastMonthDate, currentDate),

      }
    });

    const onboardedDifference = getPercentage(lastMonthOnboardedCount, currentMonthOnboardedCount)

    return {
      resourceStats: {
        total: totalResourceCount,
        difference: resourceDifference
      },
      onboardedStats: {
        total: totalOnboardedCount,
        difference: onboardedDifference
      }
    }

  };

  async getCurrentUser(id: string) {
    return await this.userRepo.findOne(
      {
        where: { id, deletedAt: IsNull() },
        relations: { roles: true, userPaymentMethod: true }
      }
    )
  };

  async approveUserRequest(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User does not exist!`);

    await this.userRepo.save({ id: user.id, requestApproved: true })

    const mail = {
      to: user.email,
      subject: 'Request.',
      from: 'admin@cogentnetworks.com',
      text: `Your Cogent account request is approved. Please login and update your data.`,
    };

    // await this.sendgridService.send(mail);

    return { message: "Request Approved Successfully!" };
  }

  async getNewRequestUsers(getAllUsersInput: GetAllUsersInput): Promise<GetAllUsersStatsPayload> {
    try {
      const { role, limit = 20, page = 0 } = getAllUsersInput;

      const where = {
        deletedAt: IsNull(),
        requestApproved: false,
        ...(role && { roles: { role } }),
      };

      const users = await this.userRepo.find({
        where,
        relations: { userPaymentMethod: true, roles: true },
        skip: page * limit,
        take: limit
      });
      const count = await this.userRepo.count({ where });

      return { count, users }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
