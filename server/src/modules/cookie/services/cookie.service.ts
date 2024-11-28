import { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { converterFromExp } from '@common/utils';

import { CookieEnum } from '@common/enums';

import { TSchema, TSameSite, ITokens } from '@common/types';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService<TSchema>) {}

  public set(res: Response, { access, refresh }: ITokens): void {
    res.cookie(CookieEnum.access, access, this.accessOptions);
    res.cookie(CookieEnum.refresh, refresh, this.refreshOptions);
    res.cookie(CookieEnum.auth, true, this.authOptions);
    res.send();
  }

  public clear(res: Response): void {
    res.clearCookie(CookieEnum.access, {
      ...this.accessOptions,
      maxAge: 0,
    });
    res.clearCookie(CookieEnum.refresh, {
      ...this.refreshOptions,
      maxAge: 0,
    });
    res.clearCookie(CookieEnum.auth, {
      ...this.authOptions,
      maxAge: 0,
    });
    res.send();
  }

  public get refreshOptions(): CookieOptions {
    const maxAge = this.refreshMaxAge;
    const httpOnly = this.httpOnly;
    const base = this.base;
    const path = this.path;

    return {
      ...base,
      httpOnly,
      maxAge,
      path,
    };
  }

  public get accessOptions(): CookieOptions {
    const maxAge = this.accessMaxAge;
    const base = this.base;

    return {
      ...base,
      maxAge,
    };
  }

  public get authOptions(): CookieOptions {
    const maxAge = this.refreshMaxAge;
    const base = this.base;

    return {
      ...base,
      maxAge,
    };
  }

  private get base(): CookieOptions {
    const sameSite = this.sameSite;
    const domain = this.domain;
    const secure = this.secure;

    return {
      sameSite,
      domain,
      secure,
    };
  }

  private get accessMaxAge(): number {
    return converterFromExp(this.accessExpiration, 'ms');
  }

  private get refreshMaxAge(): number {
    return converterFromExp(this.refreshExpiration, 'ms');
  }

  private get accessExpiration(): string {
    return this.configService.get('JWT_ACCESS_EXPIRES');
  }

  private get refreshExpiration(): string {
    return this.configService.get('JWT_REFRESH_EXPIRES');
  }

  private get httpOnly(): boolean {
    return this.configService.get('COOKIE_HTTP_ONLY');
  }

  private get secure(): boolean {
    return this.configService.get('COOKIE_SECURE');
  }

  private get sameSite(): TSameSite {
    return this.configService.get('COOKIE_SAME_SITE');
  }

  private get domain(): string {
    return this.configService.get('CLIENT_DOMAIN');
  }

  private get path(): string {
    return this.configService.get('COOKIE_PATH_REFRESH');
  }
}
