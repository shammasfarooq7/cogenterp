import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { UsersModule } from '../users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [PassportModule.register({
    defaultStrategy:"jwt"
  }), UsersModule, JwtModule.register({
    signOptions: {expiresIn: process.env.JWT_EXPIRY},
    secret: process.env.JWT_SECRET
  }), TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule {}