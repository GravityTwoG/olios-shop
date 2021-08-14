import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      return req.session.user !== undefined;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req.session.user !== undefined;
  }
}
