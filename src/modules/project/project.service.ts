import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { GetAllProjectsInput } from './dto/get-all-projects.input';
import { CommonPayload } from 'src/users/dto/common.dto';
import { GetAllProjectsPayload } from './dto/get-all-projects.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>,
    private readonly customerService: CustomerService){}

  async createProject(createProjectInput: CreateProjectInput) {
    try {
      const customer = await this.customerService.getCustomer(createProjectInput.customerId)

      if (!customer) throw new NotFoundException(`Customer does not exist!`)

      const project = await this.projectRepo.save({
        ...createProjectInput,
        customer: customer
      })
      project.generateDerivedId();
      await this.projectRepo.save({})

      return { message: "Project Created Successfully!" };
    } catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async getAllProjects(getAllProjectsInput: GetAllProjectsInput): Promise<GetAllProjectsPayload>  {
    try {
      const { limit = 20, page = 0, searchQuery } = getAllProjectsInput;

      const whereClause = {
        deletedAt: IsNull(),
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
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProjectsByCustomer(id: string) {
    try {
      const projects = await this.projectRepo.find(
        {
          where: { customerId: id, deletedAt: IsNull() },
        }
      )
      if (!projects) throw new NotFoundException(`Customer has no Projects.`)
      return projects
    } catch(error) {
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
