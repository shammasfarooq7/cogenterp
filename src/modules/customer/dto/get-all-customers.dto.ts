import { ObjectType, Field } from '@nestjs/graphql';
import { Customer } from '../entities/customer.entity';

@ObjectType()
export class GetAllCustomersPayload {
    @Field(()=>[Customer])
    customers: Customer[];

    @Field()
    count: number;
}
