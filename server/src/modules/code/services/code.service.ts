import { Cache } from 'cache-manager';
import {
  CACHE_MANAGER,
  HttpException,
  Injectable,
  Inject,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ErrorService } from '@common/errors';

import { messageNewCode, messageTemplate } from '@common/utils';

import { MailService } from '@modules/mail/services';

import { ConfirmationUser } from '@modules/auth/dto';

import { SUBJECT } from '@common/constants';

import { TSchema } from '@common/types';

@Injectable()
export class CodeService extends ErrorService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService<TSchema>,
    private readonly mail: MailService,
  ) {
    super();
  }

  public async removeCode(email: string): Promise<void> {
    await this.cacheManager.del(`code_${email}`);
  }

  public async newCode(
    email: string,
    name?: string,
    isRepeat?: boolean,
  ): Promise<void> {
    const code = this.generateCode();

    await this.removeCode(email);
    await this.setCode(email, code);

    const subject = isRepeat ? SUBJECT.NEW_CODE : SUBJECT.REGISTRATION;
    const message = isRepeat
      ? messageNewCode(code, name)
      : messageTemplate(code, name);

    return this.mail.send(email, message, subject);
  }

  public async checkCode({ email, code }: ConfirmationUser): Promise<boolean> {
    const candidate = await this.getCode(email);

    return candidate === code;
  }

  public get notValidCode(): HttpException {
    throw this.badRequest('user.not_valid_code');
  }

  private async setCode(
    email: string,
    code: string,
    ttl = this.ttlCode,
  ): Promise<void> {
    await this.cacheManager.set(`code_${email}`, code, { ttl });
  }

  private generateCode(): string {
    const min = Math.ceil(111111);
    const max = Math.floor(999999);

    return String(Math.floor(Math.random() * (max - min)) + min);
  }

  private async getCode(email: string): Promise<string | undefined> {
    return this.cacheManager.get<string>(`code_${email}`);
  }

  private get ttlCode(): number {
    return this.configService.get<number>('TTL_ACTIVATION_CODE');
  }
}
