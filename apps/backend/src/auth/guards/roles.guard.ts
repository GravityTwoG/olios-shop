import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from '@prisma/client';
import { Observable } from 'rxjs';

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

    const request = context.switchToHttp().getRequest();
    const user = request.session.user as User;
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(requiredRoles: UserRole[], userRole: UserRole): boolean {
    // at least one match
    return requiredRoles.some((requiredRole) => requiredRole === userRole);
  }
}
