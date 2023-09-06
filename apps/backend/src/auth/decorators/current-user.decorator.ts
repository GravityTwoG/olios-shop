import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from '../types';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    return context.switchToHttp().getRequest<Request>().session.user;
  },
);
