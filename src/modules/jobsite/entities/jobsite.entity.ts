import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from 'src/modules/project/entities/project.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Jobsite {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  projectId: string;

  @ManyToOne(() => Project, project => project.jobsites, { nullable: true })
  project: Project;
}
