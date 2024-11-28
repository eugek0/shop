import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

import { TokenService } from '@modules/tokens/services';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) return Promise.reject();

      req.user = await this.tokenService.verifyAccess(token);

      return true;
    } catch {
      throw this.exception;
    }
  }

  private get exception(): HttpException {
    return this.tokenService.accessError;
  }
}

@Injectable()
export class AccessOptionalGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) return true;

      req.user = await this.tokenService.verifyAccess(token);

      return true;
    } catch {
      return true;
    }
  }
}
