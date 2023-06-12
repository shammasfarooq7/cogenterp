import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserRole } from './entities/role.entity';
import { RoleService } from './role.service';
import { AuthService } from './auth/auth.service';
import { GetAllUsersInput } from './dto/get-all-users-input';
import { GetAllUsersStatsPayload } from './dto/get-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
  ) { }

  async create(createUserInput: CreateUserInput) {
    try {
      const { email, role } = createUserInput;
      const user = await this.userRepo.findOneBy({ email })
      const roleType = await this.roleService.findByType(role);
      const password = email
      if (user) {
        throw new InternalServerErrorException("Email already exist");
      }
      const newUser = await this.userRepo.save({
        ...createUserInput,
        password,
        roles: [roleType]
      })
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllUsers(getAllUsersInput: GetAllUsersInput): Promise<GetAllUsersStatsPayload> {
    try {
      const { role, limit = 20, page = 0, searchQuery } = getAllUsersInput;

      const whereClause = {
        deletedAt: IsNull(),
        requestApproved: true,
        ...(role && { roles: { role } }),
      };

      const where = [
        { ...(searchQuery && { email: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { firstName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { lastName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { country: ILike(`%${searchQuery}%`) }), ...whereClause },

      ];

      const users = await this.userRepo.find({
        where,
        relations: { userPaymentMethod: true, roles: true, },
        skip: page * limit,
        take: limit
      });

      const count = await this.userRepo.count({ where })
      return {
        count,
        users
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.userRepo.findOneBy({ id });
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepo.findOneBy({ email });
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }


  async getLoggedInUserFromToken(auth: string) {
    try {
      const payload = await this.authService.verifyToken(auth);
      if (payload) {

        const result = await this.userRepo.findOne({
          select: { id: true, roles: { role: true } },
          relations: {
            roles: true
          },
          where: {
            id: payload.userId
          },
        });

        return {
          ...payload,
          roles: result?.roles?.map(item => item?.role) || []
        }
      }
      throw new UnauthorizedException('Invalid Authorization Token - No Token Provided in Headers');
    } catch (error) {
      throw error
    }

  }

  async getCurrentUser(id: string) {
    return await this.userRepo.findOne(
      {
        where: { id, deletedAt: IsNull() },
        relations: { roles: true, userPaymentMethod: true }
      }
    )
  };

}
