import { Module } from '@nestjs/common';
import { JobsiteService } from './jobsite.service';
import { JobsiteResolver } from './jobsite.resolver';

@Module({
  providers: [JobsiteResolver, JobsiteService]
})
export class JobsiteModule {}
