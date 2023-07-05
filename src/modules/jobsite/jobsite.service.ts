import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJobsiteInput } from './dto/create-jobsite.input';
import { UpdateJobsiteInput } from './dto/update-jobsite.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobsite } from './entities/jobsite.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { CommonPayload } from 'src/users/dto/common.dto';
import { GetAllJobsitesInput } from './dto/get-all-jobsites.input';

@Injectable()
export class JobsiteService {
  constructor(@InjectRepository(Jobsite) private jobsiteRepo: Repository<Jobsite>,
    private readonly projectService: ProjectService){}

  async createJobsite(createJobsiteInput: CreateJobsiteInput) {
    try {
      const project = await this.projectService.getProject(createJobsiteInput.projectId)

      if (!project) throw new NotFoundException(`Project does not exist!`)

      await this.jobsiteRepo.save({
        ...createJobsiteInput,
        project: project
      })

      return { message: "Jobsite Created Successfully!" };
    } catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async getJobsite(id: string) {
    try {
      const jobsite = await this.jobsiteRepo.findOne(
        {
          where: { id, deletedAt: IsNull() },
        }
      )
      if (!jobsite) throw new NotFoundException(`Jobsite with ${id} does not exist!`)
      return jobsite
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getJobsitesByProject(id: string) {
    try {
      const jobsites = await this.jobsiteRepo.find(
        {
          where: { projectId: id, deletedAt: IsNull() },
        }
      )
      if (!jobsites) throw new NotFoundException(`Project has no Jobsites.`)
      return jobsites
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateJobsite(id: string, updateJobsiteInput: UpdateJobsiteInput): Promise<CommonPayload> {

    try{
      let jobsite = await this.jobsiteRepo.findOneBy({ id });

      if (!jobsite) {
        throw new NotFoundException(`Jobsite with ID ${id} does not exist!`);
      }

      jobsite = await this.jobsiteRepo.save({
        ...jobsite,
        ...updateJobsiteInput,
      });

      return { message: 'Jobsite updated successfully!' };
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteJobsite(id: string): Promise<CommonPayload> {
    try {
      await this.jobsiteRepo.update({ id }, { deletedAt: new Date() })
      return { message: "Jobsite Deleted Successfully!" };
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  };

  async getAllJobsites(getAllJobsitesInput: GetAllJobsitesInput): Promise<Jobsite[]>{
    try{
      const { limit = 20, page = 0, searchQuery } = getAllJobsitesInput;

      const whereClause = {
        deletedAt: IsNull(),
      };

      const where = [
        { ...(searchQuery && { email: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { firstName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { lastName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { country: ILike(`%${searchQuery}%`) }), ...whereClause },

      ];

      const jobsites = await this.jobsiteRepo.find({
        where,
        skip: page * limit,
        take: limit
      });

      return jobsites

    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

}
