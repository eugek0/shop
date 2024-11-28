import { CACHE_MANAGER, forwardRef, Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import ms = require('ms');

import { ErrorService } from '@common/errors';

import { SeanceService } from '@modules/seance/services';

import { MUser } from '@modules/user/models';

import { IPayload, ITokenValue, TSchema } from '@common/types';

@Injectable()
export class TokenService extends ErrorService {
  constructor(
    private readonly configService: ConfigService<TSchema>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(forwardRef(() => SeanceService))
    private seanceService: SeanceService,
    private readonly jwt: JwtService,
  ) {
    super();
  }

  public async verifyAccess(token: string): Promise<ITokenValue> {
    try {
      const secret = this.accessSecret;

      const value = await this.jwt.verify<ITokenValue>(token, {
        secret,
      });

      if (!value) this.accessError;

      const blocked = await this.checkJtiInBlackList(value.jti);

      if (blocked) this.accessError;

      return value;
    } catch {
      this.accessError;
    }
  }

  public async verifyRefresh(token: string): Promise<ITokenValue> {
    try {
      const secret = this.refreshSecret;

      const value = this.jwt.verify<ITokenValue>(token, {
        secret,
      });

      const candidate = await this.seanceService.findById(value.jti, {
        where: {
          id: value.jti,
          userId: value.id,
        },
      });

      if (candidate?.token !== token) this.refreshError;

      return value;
    } catch {
      this.refreshError;
    }
  }

  private async checkJtiInBlackList(jti: string): Promise<typeof jti | null> {
    const candidate = await this.cacheManager.get<typeof jti>(`blocked_${jti}`);
    return candidate || null;
  }

  public async decode(token: string): Promise<ITokenValue> {
    return <ITokenValue>this.jwt.decode(token);
  }

  public async blockedAccess(jti: string): Promise<void> {
    const ttl = ms(<string>this.configService.get('JWT_ACCESS_EXPIRES'));
    await this.cacheManager.set(`blocked_${jti}`, jti, { ttl });
  }

  public createRefresh(payload: IPayload): string {
    const expiresIn = this.refreshExpiration;
    const secret = this.refreshSecret;
    return this.generateToken(payload, expiresIn, secret);
  }

  public createAccess(payload: IPayload): string {
    const expiresIn = this.accessExpiration;
    const secret = this.accessSecret;
    const token = this.generateToken(payload, expiresIn, secret);

    return this.addBearer(token);
  }

  private generateToken(
    payload: IPayload,
    expiresIn: string,
    secret: string,
  ): string {
    return this.jwt.sign(payload, { expiresIn, secret });
  }

  public getPayloadByUser(user: MUser, jti: string): IPayload {
    const { id, email } = user;
    const iss = this.host;

    return {
      email,
      jti,
      iss,
      id,
    };
  }

  public addBearer(token: string): string {
    return `Bearer ${token}`;
  }

  private get accessSecret(): string {
    return this.configService.get('JWT_ACCESS_SECRET');
  }

  private get refreshSecret(): string {
    return this.configService.get('JWT_REFRESH_SECRET');
  }

  private get blackListKey(): string {
    return this.configService.get('REDIS_TOKEN_BLACK_LIST_KEY');
  }

  private get accessExpiration(): string {
    return this.configService.get('JWT_ACCESS_EXPIRES');
  }

  private get refreshExpiration(): string {
    return this.configService.get('JWT_REFRESH_EXPIRES');
  }

  private get host(): string {
    return this.configService.get('HOST_NAME');
  }
}
