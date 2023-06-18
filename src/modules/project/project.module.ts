import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Customer } from '../customer/entities/customer.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from 'src/users/entities/role.entity';
import { Jobsite } from '../jobsite/entities/jobsite.entity';
import { CustomerService } from '../customer/customer.service';
import { RoleService } from '../../users/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Customer, User, Role, Jobsite])
  ],
  providers: [ProjectResolver, ProjectService, TypeOrmModule, CustomerService, RoleService],
  exports: [ProjectService]
})
export class ProjectModule { }
