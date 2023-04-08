import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { RoleService } from '../role.service';
import { UserRole } from '../entities/role.entity';
import { SignUpUserInput } from '../dto/sign-up-user.input';
import { IPayload } from './interfaces/current-user.interface';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService, private readonly roleService: RoleService) { }

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.userRepo.findOneBy({ email: email.trim() });
      if (user && bcrypt.compareSync(pass, user.password)) {
        const { password, ...result } = user;
        return result
      }
      return null;
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    const user = await this.userRepo.findOne({
      where: { email: loginUserInput.email },
      relations: { roles: true },
      select: { id: true, roles: { role: true } }
    })
    const token = await this.jwtService.sign({ email: user.email, sub: user.id })
    return {
      accessToken: token,
      roles: user.roles.map(item => item.role),
    };
  }

  async signup(signUpUserInput: SignUpUserInput) {
    try {
      const user = await this.userRepo.findOneBy({ email: signUpUserInput.email })
      const roleType = UserRole.RESOURCE;
      const role = await this.roleService.findByType(roleType);
      if (user) {
        throw new ConflictException('User already exists');
      }
      const newUser = await this.userRepo.save({
        ...signUpUserInput,
        roles: [role]
      });

      return newUser;
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }

  async verifyToken(auth: string) {
    try {
      if (auth.split(' ')[0] !== 'Bearer') {
        throw new UnauthorizedException('Invalid Authorization Token - No Token Provided in Headers');
      };
      const token = auth.split(' ')[1];
      const payload: IPayload = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const userId = payload?.sub;
      delete payload.sub;
      return { ...payload, userId }

    } catch (error) {
      throw error
    }
  }
}
