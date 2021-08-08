import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../users/user.entity';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user as User;
    }

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user as User;
  },
);
