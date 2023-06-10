import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/entities/role.entity';
import { CreateResourceInput } from '../../users/dto/create-resource-input';
import { RoleService } from '../../users/role.service';
import { CommonPayload } from '../../users/dto/common.dto';
import { Resource } from 'src/modules/resources/entity/resource.entity';
import { UserPaymentMethod } from '../userPaymentMethods/entity/userPaymentMethod.entity';
import { GetAllResourcesInput } from '../dto/get-all-resources-input';
import { GetAllResourcesStatsPayload } from '../dto/get-all-resources.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Resource) private resourceRepo: Repository<Resource>,
    @InjectRepository(UserPaymentMethod) private userPaymentMethodRepo: Repository<UserPaymentMethod>,
    private readonly roleService: RoleService,
  ) { }


  async getAllResources(getAllResourcesInput: GetAllResourcesInput): Promise<GetAllResourcesStatsPayload> {
    try {
      const { limit = 20, page = 0, searchQuery } = getAllResourcesInput;

      const whereClause = {
        deletedAt: IsNull(),
        requestApproved: true,
      };

      const where = [
        { ...(searchQuery && { email: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { firstName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { lastName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { country: ILike(`%${searchQuery}%`) }), ...whereClause },

      ];

      const resources = await this.resourceRepo.find({
        where,
        relations: { userPaymentMethod: true, },
        skip: page * limit,
        take: limit
      });

      const count = await this.userRepo.count({ where })
      return {
        count,
        resources
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createResource(userId: string, createResourceInput: CreateResourceInput): Promise<CommonPayload> {

    const {
      accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, email, ...resource
    } = createResourceInput;

    const alreadyExists = await this.userRepo.findOne({
      where: [
        { email },
      ]
    });

    if (alreadyExists) {
      throw new ConflictException('Resource already exists');
    };

    const currentUser = await this.userRepo.findOne({ where: { id: userId } })

    const roleType = UserRole.RESOURCE;
    const role = await this.roleService.findByType(roleType);
    const pass = (Math.random() * 1e16).toString(36);

    // Create User
    const newUser = await this.userRepo.save({
      email,
      password: pass,
      roles: [role],
    })

    // Create Resource
    const newResource = await this.resourceRepo.save({
      ...resource,
      ...(resource?.isOnboarded ? { onboardedAt: new Date(), onboardedBy: currentUser } : {}),
      password: pass,
      requestApproved: true,
      roles: [role],
      user: newUser
    });

    if (resource?.isOnboarded) {
      await this.userRepo.update({ id: userId }, { onboardedResources: newResource })
    }
    await this.userRepo.update({ id: newUser.id }, { resource: newResource })



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

}
