import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Roles } from '../../users/roles.decorator';
import { CommonPayload } from 'src/users/dto/common.dto';
import { IContext } from 'src/users/auth/interfaces/context.interface';
import { UserRole } from 'src/users/entities/role.entity';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}


  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async createCustomer(@Args('createCustomerInput') createCustomer: CreateCustomerInput, @Context() ctx: IContext): Promise<CommonPayload> {
    return await this.customerService.createCustomer(ctx?.user?.userId, createCustomer)
  }

  // @Query(() => [Customer], { name: 'customer' })
  // findAll() {
  //   return this.customerService.findAll();
  // }

  // @Query(() => Customer, { name: 'customer' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.customerService.findOne(id);
  // }

  // @Mutation(() => Customer)
  // updateCustomer(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
  //   return this.customerService.update(updateCustomerInput.id, updateCustomerInput);
  // }

  // @Mutation(() => Customer)
  // removeCustomer(@Args('id', { type: () => Int }) id: number) {
  //   return this.customerService.remove(id);
  // }
}
