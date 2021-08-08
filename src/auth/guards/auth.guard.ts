import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      return req.isAuthenticated();
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req.isAuthenticated();
  }
}
