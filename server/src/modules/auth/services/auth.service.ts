import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { ErrorService } from '@common/errors';

import {
  messageConfirmationRegistration,
  messageLogin,
  Hasher,
} from '@common/utils';

import { SeanceService } from '@modules/seance/services';
import { UserService } from '@modules/user/services';
import { CodeService } from '@modules/code/services';
import { MailService } from '@modules/mail/services';

import { MUser } from '@modules/user/models';

import { ConfirmationUser, Email, LoginUser } from '@modules/auth/dto';
import { CreateUserDto } from '@modules/user/dto';

import { IDevice, TSchema } from '@common/types';
import { UserStatusEnum } from '@common/enums';

import { FORegistration } from '@modules/auth/query';
import { SUBJECT } from '@common/constants';

@Injectable()
export class AuthService extends ErrorService {
  constructor(
    private readonly configService: ConfigService<TSchema>,
    private readonly seanceService: SeanceService,
    private readonly userService: UserService,
    private readonly codeService: CodeService,
    private readonly mail: MailService,
  ) {
    super();
  }

  public async registration(
    dto: CreateUserDto,
  ): Promise<HttpException | MUser> {
    const { email, ...updated } = dto;
    const options = FORegistration(email);
    const candidate = await this.userService.findByEmail(email);
    const name = this.nameByUser(dto);

    if (candidate?.status === UserStatusEnum.pending) {
      await candidate.update({ ...updated });
      await this.codeService.newCode(email, name, true);

      return this.userService.findByEmail(email, options);
    }

    if (candidate) this.existByEmail;

    await this.userService.create(dto);
    await this.codeService.newCode(email, name);

    return this.userService.findByEmail(email, options);
  }

  public async login(
    dto: LoginUser,
    device: IDevice,
    res: Response,
  ): Promise<void> {
    const { password, email } = dto;

    const candidate = await this.userService.findByEmail(email);

    if (!candidate) this.incorrect;
    if (candidate?.status === UserStatusEnum.pending) this.notActivated;

    const isValidPassword = await Hasher.comparer(password, candidate.password);

    if (!isValidPassword) this.incorrect;

    const name = this.nameByUser(candidate);

    this.mail.send(email, messageLogin(device, name), SUBJECT.LOGIN);

    return this.seanceService.create(candidate, device, res);
  }

  public async newCode({ email }: Email): Promise<void> {
    const candidate = await this.userService.findByEmail(email);

    if (!candidate) this.notFound('user.not_found');

    if (candidate.status !== UserStatusEnum.pending) this.alreadyActivated;

    const name = this.nameByUser(candidate);

    return this.codeService.newCode(email, name, true);
  }

  public async confirmation(
    dto: ConfirmationUser,
    device: IDevice,
    res: Response,
  ): Promise<void> {
    const candidate = await this.userService.findByEmail(dto.email);

    if (!candidate) this.notFound('user.not_found');

    if (candidate.status !== UserStatusEnum.pending) this.alreadyActivated;

    const isValidCode = await this.codeService.checkCode(dto);

    if (!isValidCode) this.codeService.notValidCode;

    const status = UserStatusEnum.active;
    const name = this.nameByUser(candidate);
    const message = messageConfirmationRegistration(name);

    await candidate.update({ status });
    await this.codeService.removeCode(dto.email);
    await this.mail.send(dto.email, message, SUBJECT.CONFIRMATION);

    return this.seanceService.create(candidate, device, res);
  }

  private nameByUser({
    firstName,
    lastName,
  }: Pick<MUser, 'lastName' | 'firstName'>): string {
    return `${firstName} ${lastName}`;
  }

  private get existByEmail(): HttpException {
    throw this.alreadyExist('user.exist.email');
  }

  private get incorrect(): HttpException {
    throw this.badRequest('user.incorrect');
  }

  private get notActivated(): HttpException {
    throw this.badRequest('user.not_activated');
  }

  private get alreadyActivated(): HttpException {
    throw this.badRequest('user.activated');
  }
}
