import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { UserRole } from '@prisma/client';

import { Request } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const user = request.session.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const matches = this.matchRoles(roles, user.role);

    if (!matches) {
      throw new ForbiddenException('Invalid role');
    }

    return true;
  }

  private matchRoles(requiredRoles: UserRole[], userRole: UserRole): boolean {
    // at least one match
    return requiredRoles.some((requiredRole) => requiredRole === userRole);
  }
}
