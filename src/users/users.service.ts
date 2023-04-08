import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserRole } from './entities/role.entity';
import { CreateResourceInput } from './dto/create-resource-input';
import { UserPaymentMethod } from './../modules/userPaymentMethods/entity/userPaymentMethod.entity';
import { RoleService } from './role.service';
import { AuthService } from './auth/auth.service';
import { CommonPayload } from './dto/common.dto';
import { UpdateResourceInput } from './dto/update-resource-input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserPaymentMethod) private userPaymentMethodRepo: Repository<UserPaymentMethod>,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
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

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepo.find({
        where: { deletedAt: IsNull() },
        relations: { userPaymentMethod: true, roles: true }
      });
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

  async createResource(createResourceInput: CreateResourceInput): Promise<CommonPayload> {

    const { accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, ...user } = createResourceInput;

    const alreadyExists = await this.userRepo.findOne({
      where: [
        { cogentEmail: user.cogentEmail }
      ]
    });

    if (alreadyExists) {
      throw new ConflictException('Resource already exists');
    };

    const roleType = UserRole.RESOURCE;
    const role = await this.roleService.findByType(roleType);

    const newUser = await this.userRepo.save({
      ...user,
      password: "12345678",
      roles: [role],
    });

    await this.userPaymentMethodRepo.save({
      accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
      user: newUser
    })

    return { message: "Resource Created Successfully!" };
  }

  async updateResource(id: string, updateResourceInput: UpdateResourceInput): Promise<CommonPayload> {

    const { accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, ...userData } = updateResourceInput;

    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User with ${id} does not exist!`);

    Object.keys(userData).forEach((key) => { user[key] = userData[key] });

    await this.userRepo.save(user);

    await this.userPaymentMethodRepo.update({
      userId: user.id
    }, {
      accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
    });

    return { message: "Resource Updated Successfully!" };
  }

  async getResource(id: string) {
    return await this.userRepo.findOne(
      {
        where: { id, deletedAt: IsNull() },
        relations: { roles: true, userPaymentMethod: true }
      }
    )
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
}
