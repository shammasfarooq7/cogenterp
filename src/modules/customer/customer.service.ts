import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CommonPayload } from 'src/users/dto/common.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { RoleService } from 'src/users/role.service';
import { UserRole } from '../userRoles/entity/userRole.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly roleService: RoleService,
  ){}
  async createCustomer(userId: string, createCustomerInput: CreateCustomerInput): Promise<CommonPayload> {
    try{
      const { email, ...customer } = createCustomerInput;

      const alreadyExists = await this.userRepo.findOne({
        where: [
          { email },
        ]
      });
  
      if (alreadyExists) {
        throw new ConflictException('Customer already exists');
      };
  
      const currentUser = await this.userRepo.findOne({ where: { id: userId } })
  
      const roleType = UserRole.CUSTOMER;
      const role = await this.roleService.findByType(roleType);
      const pass = email;
  
      const newUser = await this.userRepo.save({
        email,
        password: pass,
        roles: [role],
      })

      const newCustomer = await this.customerRepo.save({
        ...customer,
        onboardedAt: new Date(), 
        onboardedBy: currentUser,
        email,
        roles: [role],
        user: newUser
      });
  
      // await this.userRepo.update({ id: userId }, { onboardedCustomers: newCustomer })
      // await this.userRepo.update({ id: newUser.id }, { customer: newCustomer })

      return { message: "Customer Created Successfully!" };

    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
