import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from '../../users/role.service';
import { User } from './../../users/entities/user.entity';
import { Role } from '../../users/entities/role.entity';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, User, Role, Project])
  ],
  providers: [CustomerResolver, CustomerService, TypeOrmModule, RoleService],
  exports: [CustomerService]
})
export class CustomerModule { }
