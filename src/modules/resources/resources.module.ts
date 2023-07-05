import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Resource } from './entity/resource.entity';
import { AzureBlobService } from 'src/azure-blob/azure-blob.service';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { AuthService } from 'src/users/auth/auth.service';
import { Role } from 'src/users/entities/role.entity';
import { RoleService } from 'src/users/role.service';
import { UserPaymentMethod } from '../userPaymentMethods/entity/userPaymentMethod.entity';
import { User } from '../../users/entities/user.entity';
import { UserSubscriber } from 'src/users/subscribers/user.subscriber';
import { ResourcesService } from './resources.service';
import { ResourcesResolver } from './resources.resolver';
import { LoginTracker } from 'src/users/entities/loginTracker.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { TimeSheet } from '../tickets/entities/timeSheet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPaymentMethod, Role, LoginTracker, Resource, TimeSheet]),
    TicketsModule
  ],
  providers: [ResourcesResolver, ResourcesService, UserSubscriber, TypeOrmModule, RoleService, AuthService,
    JwtService, SendgridService, AzureBlobService, ConfigService],
  exports: [ResourcesService]
})
export class ResourcesModule { }
