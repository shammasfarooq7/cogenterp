import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserRole } from './entities/role.entity';
import { CreateResourceInput } from './dto/create-resource-input';
import { UserPaymentMethod } from './../modules/userPaymentMethods/entity/userPaymentMethod.entity';
import { RoleService } from './role.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserPaymentMethod) private userPaymentMethodRepo: Repository<UserPaymentMethod>,
    private readonly roleService: RoleService) { }

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
      return await this.userRepo.find({ relations: { userPaymentMethod: true, roles: true } });
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

  async createResource(createResourceInput: CreateResourceInput) {

    const { accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, ...user } = createResourceInput;

    const alreadyExists = await this.userRepo.findOne({
      where: [
        { email: user.email },
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

    return { message: "User Created Successfully!" };
  }
}
