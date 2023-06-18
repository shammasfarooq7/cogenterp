import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CommonPayload } from 'src/users/dto/common.dto';
import { Customer } from './entities/customer.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { RoleService } from 'src/users/role.service';
import { UserRole } from 'src/users/entities/role.entity';
import { GetAllCustomersInput } from './dto/get-all-customers.input';
import { GetAllCustomersPayload } from './dto/get-all-customers.dto';

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
        user: newUser
      });
  
      await this.userRepo.update({ id: userId }, { onboardedCustomers: [newCustomer] })
      await this.userRepo.update({ id: newUser.id }, { customer: newCustomer })

      return { message: "Customer Created Successfully!" };

    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async getAllCustomers(getAllCustomersInput: GetAllCustomersInput): Promise<GetAllCustomersPayload> {
    try {
      const { limit = 20, page = 0, searchQuery } = getAllCustomersInput;

      const whereClause = {
        deletedAt: IsNull(),
      };

      const where = [
        { ...(searchQuery && { email: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { name: ILike(`%${searchQuery}%`) }), ...whereClause },

      ];

      const customers = await this.customerRepo.find({
        where,
        skip: page * limit,
        take: limit
      });

      const count = await this.customerRepo.count({ where })
      return {
        count,
        customers
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCustomer(id: string) {
    try {
      const customer = await this.customerRepo.findOne(
        {
          where: { id, deletedAt: IsNull() },
        }
      )
      if (!customer) throw new NotFoundException(`Customer with ${id} does not exist!`)
      return customer
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateCustomer(id: string, updateCustomerInput: UpdateCustomerInput): Promise<CommonPayload> {
    let customer = await this.customerRepo.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} does not exist!`);
    }

    const { email } = updateCustomerInput;
    const alreadyExists = await this.customerRepo.findOneBy({ email });

    if (alreadyExists && alreadyExists.id !== customer.id) {
      throw new ConflictException('Customer with this email already exists!');
    }

    customer = await this.customerRepo.save({
      ...customer,
      ...updateCustomerInput,
    });

    return { message: 'Customer updated successfully!' };
  }

  async deleteCustomer(id: string): Promise<CommonPayload> {
    await this.customerRepo.update({ id }, { deletedAt: new Date() })
    return { message: "Customer Deleted Successfully!" };
  };

}
