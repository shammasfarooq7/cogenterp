import { Injectable } from '@nestjs/common';
import { CreateJobsiteInput } from './dto/create-jobsite.input';
import { UpdateJobsiteInput } from './dto/update-jobsite.input';

@Injectable()
export class JobsiteService {
  create(createJobsiteInput: CreateJobsiteInput) {
    return 'This action adds a new jobsite';
  }

  findAll() {
    return `This action returns all jobsite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobsite`;
  }

  update(id: number, updateJobsiteInput: UpdateJobsiteInput) {
    return `This action updates a #${id} jobsite`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobsite`;
  }
}
