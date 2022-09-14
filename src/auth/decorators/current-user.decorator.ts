import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().session.user as User;
  },
);
