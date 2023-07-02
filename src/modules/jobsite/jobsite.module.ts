import { Module } from '@nestjs/common';
import { JobsiteService } from './jobsite.service';
import { JobsiteResolver } from './jobsite.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobsite } from './entities/jobsite.entity';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/entities/project.entity';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { User } from '../../users/entities/user.entity';
import { RoleService } from '../../users/role.service';
import { Role } from '../../users/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jobsite, Project, Customer, User, Role])
  ],
  providers: [JobsiteResolver, JobsiteService, ProjectService, CustomerService, RoleService],
  exports: [JobsiteService]
})
export class JobsiteModule { }
