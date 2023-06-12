import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from 'src/modules/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('jobsites')
export class Jobsite {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  projectId: string;

  @ManyToOne(() => Project, project => project.jobsites, { nullable: true })
  project: Project;
}
