import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Roles } from 'src/users/roles.decorator';
import { UserRole } from 'src/users/entities/role.entity';
import { CommonPayload } from 'src/users/dto/common.dto';
import { IContext } from 'src/users/auth/interfaces/context.interface';
import { CurrentUser } from 'src/users/auth/decorators/current-user.decorator';
import { ICurrentUser } from 'src/users/auth/interfaces/current-user.interface';
import { GetAllProjectsPayload } from './dto/get-all-projects.dto';
import { GetAllProjectsInput } from './dto/get-all-projects.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) { }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async createProject(@Args('createProjectInput') createProject: CreateProjectInput): Promise<CommonPayload> {
    return await this.projectService.createProject(createProject)
  }

  @Roles(UserRole.ADMIN)
  @Query(() => GetAllProjectsPayload)
  async getAllProjects(@Context() ctx: IContext, @Args('getAllProjectsInput') getAllProjectsInput: GetAllProjectsInput): Promise<GetAllProjectsPayload> {
    return await this.projectService.getAllProjects(ctx.user, getAllProjectsInput);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => Project)
  async getProject(@Args('id') id: string): Promise<Project> {
    return await this.projectService.getProject(id);
  }

  @Roles(UserRole.ADMIN, UserRole.SD)
  @Query(() => [Project])
  async getProjectByCustomer(@Args('id') id: string): Promise<Project[]> {
    return await this.projectService.getProjectsByCustomer(id);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async updateProject(@Args('id') id: string, @Args('updateProjectInput') updateProjectInput: UpdateProjectInput): Promise<CommonPayload> {
    return await this.projectService.updateProject(id, updateProjectInput);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async deleteProject(@Args('id') id: string): Promise<CommonPayload> {
    return await this.projectService.deleteProject(id)
  }
}
