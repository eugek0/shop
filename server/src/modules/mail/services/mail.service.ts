import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { TSchema } from '@common/types';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<TSchema>,
    private readonly mailer: MailerService,
  ) {}

  public send(to: string | string[], html: string, subject: string): void {
    this.mailer
      .sendMail({
        from: this.from,
        subject,
        html,
        to,
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private get from(): string {
    return `"${this.mailSignature}" ${this.mailUser}`;
  }

  private get mailUser(): string {
    return this.configService.get<string>('MAILER_USER');
  }

  private get mailSignature(): string {
    return this.configService.get<string>('MAILER_SIGNATURE');
  }
}
