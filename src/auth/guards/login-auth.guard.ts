import { AuthGuard } from '@nestjs/passport';

// Checks if login credentials are valid
export class LoginAuthGuard extends AuthGuard('local') {
  async canActivate(ctx): Promise<boolean> {
    const result = (await super.canActivate(ctx)) as boolean;
    const req = ctx.switchToHttp().getRequest();
    await super.logIn(req);
    return result;
  }
}
