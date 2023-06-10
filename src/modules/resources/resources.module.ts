import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginTracker } from '../../users/entities/login-tracker.entity';
import { Resource } from 'src/modules/resources/entity/resource.entity';
import { AzureBlobService } from 'src/azure-blob/azure-blob.service';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { AuthService } from 'src/users/auth/auth.service';
import { Role } from 'src/users/entities/role.entity';
import { RoleService } from 'src/users/role.service';
import { UserPaymentMethod } from '../userPaymentMethods/entity/userPaymentMethod.entity';
import { User } from 'src/users/entities/user.entity';
import { UserSubscriber } from 'src/users/subscribers/user.subscriber';
import { ResourcesService } from './resources.service';
import { ResourcesResolver } from './resources.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPaymentMethod, Role, LoginTracker, Resource])
  ],
  providers: [ResourcesResolver, ResourcesService, UserSubscriber, TypeOrmModule, RoleService, AuthService,
    JwtService, SendgridService, AzureBlobService, ConfigService],
  exports: [ResourcesService]
})
export class ResourcesModule { }
