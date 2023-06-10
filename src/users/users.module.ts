import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSubscriber } from './subscribers/user.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPaymentMethod } from './../modules/userPaymentMethods/entity/userPaymentMethod.entity';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { AzureBlobService } from '../azure-blob/azure-blob.service';
import { ConfigService } from '@nestjs/config';
import { LoginTracker } from './entities/login-tracker.entity';
import { Resource } from 'src/modules/resources/entity/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPaymentMethod, Role, LoginTracker, Resource])
  ],
  providers: [UsersResolver, UsersService, UserSubscriber, TypeOrmModule, RoleService, AuthService,
    JwtService, SendgridService, AzureBlobService, ConfigService],
  exports: [UsersService]
})
export class UsersModule { }
