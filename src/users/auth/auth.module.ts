import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { UsersModule } from '../users.module';

@Module({
  imports: [PassportModule, UsersModule, JwtModule.register({
    signOptions: {expiresIn: process.env.JWT_EXPIRY},
    secret: process.env.JWT_SECRET
  })],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
