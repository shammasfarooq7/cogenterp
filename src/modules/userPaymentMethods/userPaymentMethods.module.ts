import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPaymentMethod } from './entity/userPaymentMethod.entity';
import { UserPaymentMethodsService } from './userPaymentMethods.service';
import { UserPaymentMethodsResolver } from './userPaymentMethods.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPaymentMethod])
  ],
  providers: [TypeOrmModule, UserPaymentMethodsService, UserPaymentMethodsResolver],
  exports: [UserPaymentMethodsService]
})
export class UserPaymentMethodsModule { }
