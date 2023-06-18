import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Roles } from '../../users/roles.decorator';
import { CommonPayload } from 'src/users/dto/common.dto';
import { IContext } from 'src/users/auth/interfaces/context.interface';
import { UserRole } from 'src/users/entities/role.entity';
import { CurrentUser } from 'src/users/auth/decorators/current-user.decorator';
import { ICurrentUser } from 'src/users/auth/interfaces/current-user.interface';
import { GetAllCustomersPayload } from './dto/get-all-customers.dto';
import { GetAllCustomersInput } from './dto/get-all-customers.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}


  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async createCustomer(@Args('createCustomerInput') createCustomer: CreateCustomerInput, @Context() ctx: IContext): Promise<CommonPayload> {
    return await this.customerService.createCustomer(ctx?.user?.userId, createCustomer)
  }

  @Roles(UserRole.ADMIN)
  @Query(() => GetAllCustomersPayload)
  async getAllCustomer(@CurrentUser() user: ICurrentUser, @Args('getAllCustomerInput') getAllCustomerInput: GetAllCustomersInput): Promise<GetAllCustomersPayload> {
    return await this.customerService.getAllCustomers(getAllCustomerInput);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => Customer)
  async getCustomer(@Context() ctx: IContext, @Args('id', { nullable: true, defaultValue: null }) id: string | null): Promise<Customer> {
    return await this.customerService.getCustomer(id || ctx?.user?.userId);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async updateCustomer(@Args('id') id: string, @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput): Promise<CommonPayload> {
    return await this.customerService.updateCustomer( id, updateCustomerInput);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async deleteCustomer(@Args('id') id: string): Promise<CommonPayload> {
    return await this.customerService.deleteCustomer(id)
  }
}
