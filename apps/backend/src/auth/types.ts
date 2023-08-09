import { Request as ExpressRequest } from 'express';
import { Session, SessionData } from 'express-session';
import { User } from '@prisma/client';

export type RequestUser = Omit<User, 'password'>;

export interface Request extends ExpressRequest {
  user: RequestUser | undefined;
  session: Session &
    Partial<SessionData> & {
      user: RequestUser | undefined;
    };
}
