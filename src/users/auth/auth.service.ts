import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'
import { CreateUserInput } from '../dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService ){}

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.userRepo.findOneBy({email: email.trim()});
      if (user || bcrypt.compareSync(pass, user.password)) {
        const {password, ...result} = user;
        return result
      }
      return null;
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<LoginResponse>{
    const user = await this.userRepo.findOneBy({email: loginUserInput.email})
    const token = await this.jwtService.sign({email: user.email, sub: user.id})
    return {
      accessToken: token
    };
  }

  async signup(createUserInput: CreateUserInput){
    try {
      const user = await this.userRepo.findOneBy({email: createUserInput.email})
      if(user){
        throw new ConflictException('User already exists');
      }
      const newUser = await this.userRepo.save({
        ...createUserInput
      });

      return newUser;
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }
  }
}
