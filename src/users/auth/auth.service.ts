import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { RoleService } from '../role.service';
import { UserRole } from '../entities/role.entity';
import { SignUpUserInput } from '../dto/sign-up-user.input';
import { IPayload } from './interfaces/current-user.interface';
import { LoginTracker } from '../entities/loginTracker.entity';
import { Resource } from './../../modules/resources/entity/resource.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Resource) private resourceRepo: Repository<Resource>,
    private jwtService: JwtService,
    private readonly roleService: RoleService,
    @InjectRepository(LoginTracker) private loginTrackerRepo: Repository<LoginTracker>) { }

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.userRepo.findOneBy({ email: email.trim(), deletedAt: IsNull() });
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
      relations: { roles: true, loginTracker: true },
      select: { id: true, resource: { requestApproved: true }, roles: { role: true }, }
    })

    if (user?.roles.find(role => role.role === UserRole.RESOURCE)) {

      const resource = await this.resourceRepo.findOne({
        where: { email: loginUserInput.email },
        select: { requestApproved: true }
      })

      if (!resource.requestApproved) {
        throw new Error("Your Account is not approved yet. Kindly contact with support team.")
      }
    }

    // Just For now, this line will be removed in future
    // if (!user?.roles.find(role => role.role === UserRole.RMS)) {
    //   throw new Error("Only RMS Users are allowed to login.")
    // }
    if (user?.loginTracker?.id) {
      await this.loginTrackerRepo.save({ id: user.loginTracker.id, lastLogin: new Date() })
    }
    else {
      const loginTracker = await this.loginTrackerRepo.save({ lastLogin: new Date(), user })
      await this.userRepo.update({ id: user.id }, { loginTracker })
    }


    const token = await this.jwtService.sign({ email: user.email, sub: user.id })
    return {
      accessToken: token,
      roles: user.roles.map(item => item.role),
    };
  }

  async signup(signUpUserInput: SignUpUserInput) {
    try {
      const { email, password } = signUpUserInput;
      const user = await this.userRepo.findOneBy({ email })
      const roleType = UserRole.RESOURCE;
      const role = await this.roleService.findByType(roleType);
      if (user) {
        throw new ConflictException('User already exists');
      }
      const newUser = await this.userRepo.save({
        ...signUpUserInput,
        password,
        roles: [role]
      });

      const resource = await this.resourceRepo.save({
        email,
        isARequest: true,
        user: newUser
      })

      await this.userRepo.update({ id: newUser.id }, { resource })

      return {
        message: "User Created."
      }
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
