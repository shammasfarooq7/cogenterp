import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSubscriber } from './subscribers/user.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPaymentMethod } from './../modules/userPaymentMethods/entity/userPaymentMethod.entity';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPaymentMethod, Role])
  ],
  providers: [UsersResolver, UsersService, UserSubscriber, TypeOrmModule, RoleService],
  exports: [UsersService]
})
export class UsersModule { }
