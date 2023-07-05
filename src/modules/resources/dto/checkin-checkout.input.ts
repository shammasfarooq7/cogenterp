import { InputType, Field } from '@nestjs/graphql';
import { GraphQLTime } from 'graphql-scalars';
import { CheckinCheckout } from '../../tickets/entities/timeSheet.entity'

@InputType()
export class CheckinCheckoutInput {

  @Field(() => String)
  resourceId: string;

  @Field(() => String)
  ticketDateId: string;

  @Field(() => CheckinCheckout)
  checkinOrCheckout: CheckinCheckout;

  @Field(() => GraphQLTime)
  time: string

}
