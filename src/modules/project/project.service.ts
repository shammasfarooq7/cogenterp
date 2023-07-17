import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { GetAllProjectsInput } from './dto/get-all-projects.input';
import { CommonPayload } from 'src/users/dto/common.dto';
import { GetAllProjectsPayload } from './dto/get-all-projects.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ILike, IsNull, Repository, Not } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { ICurrentUser } from '../../users/auth/interfaces/current-user.interface';
import { GetProjectsByCustomerInput } from './dto/get-projects-by-customer.input';
import { UserRole } from '../../users/entities/role.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly customerService: CustomerService) { }

  async createProject(createProjectInput: CreateProjectInput) {
    try {
      const customer = await this.customerService.getCustomer(createProjectInput.customerId)

      if (!customer) throw new NotFoundException(`Customer does not exist!`)

      const project = new Project()
      for (const input in createProjectInput) {
        project[input] = createProjectInput[input]
      }
      project.customer = customer
      await this.projectRepo.save(project)
      project.generateDerivedId();
      await this.projectRepo.save(project)

      return { message: "Project Created Successfully!" };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllProjects(currentUser: ICurrentUser, getAllProjectsInput: GetAllProjectsInput): Promise<GetAllProjectsPayload> {
    try {
      const { limit = 20, page = 0, searchQuery, customerId } = getAllProjectsInput;

      // Check if loggedIn user is customer, if yes, then only return its tickets
      // If no then check if customerId is passed in params, if yes then fetch records for that cusotmer
      const isCurrentUserCustomer = currentUser.roles.includes(UserRole.CUSTOMER);
      let filterCustomerId = customerId;
      if (isCurrentUserCustomer) {
        const user = await this.userRepo.findOne({
          where: {
            id: currentUser.userId,
            deletedAt: IsNull()
          },
          relations: { customer: true },
          select: { id: true, customer: { id: true } }
        })
        if (user) {
          filterCustomerId = user.customer.id
        }
      }

      const whereClause = {
        deletedAt: IsNull(),
        ...(filterCustomerId && { customerId: filterCustomerId })
      };

      const where = [
        { ...(searchQuery && { email: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { name: ILike(`%${searchQuery}%`) }), ...whereClause },

      ];

      const projects = await this.projectRepo.find({
        where,
        skip: page * limit,
        take: limit
      });

      const count = await this.projectRepo.count({ where })
      return {
        projects,
        count
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProject(id: string) {
    try {
      const project = await this.projectRepo.findOne(
        {
          where: { id, deletedAt: IsNull() },
        }
      )
      if (!project) throw new NotFoundException(`Project with ${id} does not exist!`)
      return project
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProjectsByCustomer(id: string, getProjectsByCustomerInput: GetProjectsByCustomerInput) {
    try {

      const { limit = 20, page = 0, projectId } = getProjectsByCustomerInput;

      let selectedProject: Project | null = null;

      if (projectId && page === 0) {
        selectedProject = await this.projectRepo.findOne(
          {
            where: { customerId: id, id: projectId, deletedAt: IsNull() },
          }
        )
      }

      const projects = await this.projectRepo.find(
        {
          where: { customerId: id, deletedAt: IsNull(), ...(selectedProject && { id: Not(projectId) }) },
          skip: page * limit,
          take: selectedProject ? limit - 1 : limit
        }
      )
      if (!projects) throw new NotFoundException(`Customer has no Projects.`)
      return selectedProject ? [selectedProject, ...projects] : projects
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateProject(id: string, updateProjectInput: UpdateProjectInput): Promise<CommonPayload> {
    let project = await this.projectRepo.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} does not exist!`);
    }

    project = await this.projectRepo.save({
      ...project,
      ...updateProjectInput,
    });

    return { message: 'Project updated successfully!' };
  }

  async deleteProject(id: string): Promise<CommonPayload> {
    await this.projectRepo.update({ id }, { deletedAt: new Date() })
    return { message: "Project Deleted Successfully!" };
  };

}
