import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from '@nestjs/core';
import { UsersService } from "../users.service";
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private readonly reflector: Reflector, private readonly usersService: UsersService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    if (context.getType() == 'http') {
      return context.getArgByIndex(0);
    } else if (context.getType<GqlContextType>() == 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.authorization) {
      throw new UnauthorizedException('Invalid Authorization Token - No Token Provided in Headers');
    }

    ctx.user = await this.usersService.getLoggedInUserFromToken(ctx.req.headers.authorization);
    return true;
  }
}