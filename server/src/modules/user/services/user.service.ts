import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { ErrorService } from '@common/errors';

import { MUser } from '@modules/user/models';

import { CreateUserDto, ChangePassword, ChangeUser } from '@modules/user/dto';

import { ID } from '@common/types';

import { FOGetUser } from '@modules/user/query';
import { Hasher } from '@common/utils';

@Injectable()
export class UserService extends ErrorService {
  constructor(@InjectModel(MUser) private user: typeof MUser) {
    super();
  }

  public async create(dto: CreateUserDto) {
    return this.user.create({ ...dto });
  }

  public async getById(id: ID): Promise<MUser> {
    const options = FOGetUser(id);
    const candidate = await this.findById(id, options);

    if (!candidate) this.notFoundUser;

    return candidate;
  }

  public async change(userId: ID, dto: ChangeUser): Promise<MUser> {
    const options = FOGetUser(userId);
    const candidate = await this.findById(userId, options);

    if (!candidate) this.notFoundUser;

    await candidate.update({ ...dto });

    return this.findById(userId, options);
  }

  public async changePassword(id: ID, dto: ChangePassword): Promise<void> {
    const options = FOGetUser(id, ['password']);
    const candidate = await this.findById(id, options);

    if (!candidate) this.notFoundUser;

    const { oldPassword, password } = dto;

    const isPasswordValid = await Hasher.comparer(
      oldPassword,
      candidate.password,
    );

    if (!isPasswordValid) this.notValidPassword;

    await candidate.update({ password });
  }

  async findByEmail(
    email: string,
    options?: FindOptions,
  ): Promise<MUser | null> {
    return this.user.findOne({ where: { email }, ...options });
  }

  async findById(id: string, options?: FindOptions): Promise<MUser | null> {
    return this.user.findOne({ where: { id }, ...options });
  }

  private get notFoundUser(): HttpException {
    throw this.notFound('user.not_found');
  }

  private get notValidPassword(): HttpException {
    throw this.badRequest('user.not_valid_password');
  }
}
