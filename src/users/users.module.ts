import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
  providers: [UsersResolver, UsersService, UserSubscriber],
  exports: [UsersService]
})
export class UsersModule {}
