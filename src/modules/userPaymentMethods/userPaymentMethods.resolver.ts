import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserPaymentMethod } from './entity/userPaymentMethod.entity';
import { UserPaymentMethodsService } from './userPaymentMethods.service';

@Resolver(() => UserPaymentMethod)
export class UserPaymentMethodsResolver {
    constructor(private readonly userPaymentMethodsService: UserPaymentMethodsService) { }

    // @UseGuards(JwtAuthGuard)
    @Query(() => [UserPaymentMethod])
    async getAllUserPaymentMethods(): Promise<UserPaymentMethod[]> {
        return await this.userPaymentMethodsService.getAllUserPaymentMethods();
    }

}
