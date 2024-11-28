import { Response } from 'express';
import {
  ExecutionContext,
  HttpException,
  CanActivate,
  Injectable,
} from '@nestjs/common';

import { TokenService } from '@modules/tokens/services';
import { CookieService } from '@modules/cookie/services';

import { CookieEnum } from '@common/enums';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly cookieService: CookieService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    try {
      const { cookies } = req;
      const { refresh } = cookies;

      if (!refresh) return Promise.reject(this.exception(res));

      const bearer = decodeURI(refresh).split(' ')[0];
      const token = decodeURI(refresh).split(' ')[1];

      if (bearer !== 'Bearer' || !token)
        return Promise.reject(this.exception(res));

      req.user = await this.tokenService.verifyRefresh(token);

      return true;
    } catch {
      this.exception(res);
    }
  }

  private exception(res: Response): HttpException {
    res.clearCookie(CookieEnum.access, {
      ...this.cookieService.accessOptions,
      maxAge: 0,
    });
    res.clearCookie(CookieEnum.refresh, {
      ...this.cookieService.refreshOptions,
      maxAge: 0,
    });
    res.clearCookie(CookieEnum.auth, {
      ...this.cookieService.authOptions,
      maxAge: 0,
    });

    throw this.tokenService.refreshError;
  }
}
