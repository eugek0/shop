import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { FindOptions } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';

import { ErrorService } from '@common/errors';

import { TokenService } from '@modules/tokens/services';
import { CookieService } from '@modules/cookie/services';

import { MSeance } from '@modules/seance/models';
import { MUser } from '@modules/user/models';

import { ID, IDevice, TSchema } from '@common/types';

import { FODeleteSeance, FOGetSeance } from '@modules/seance/query';

@Injectable()
export class SeanceService extends ErrorService {
  constructor(
    private readonly configService: ConfigService<TSchema>,
    @InjectModel(MSeance) private seance: typeof MSeance,
    @Inject(forwardRef(() => TokenService))
    private tokenService: TokenService,
    private readonly cookieService: CookieService,
  ) {
    super();
  }

  public async create(
    user: MUser,
    device: IDevice,
    res: Response,
  ): Promise<void> {
    const id = uuidv4();
    const payload = this.tokenService.getPayloadByUser(user, id);
    const refreshNotBearer = this.tokenService.createRefresh(payload);
    const refresh = this.tokenService.addBearer(refreshNotBearer);
    const access = this.tokenService.createAccess(payload);

    await this.seance.create({
      token: refreshNotBearer,
      userId: user.id,
      ...device,
      id,
    });

    return this.cookieService.set(res, { access, refresh });
  }

  public async getAll(userId: ID): Promise<MSeance[]> {
    return this.seance.findAll({
      where: { userId },
      attributes: {
        exclude: ['userId', 'token'],
      },
    });
  }

  public async getById(id: ID, options?: FindOptions): Promise<MSeance> {
    const candidate = await this.findById(id, options);

    if (!candidate) this.seanceNotFound;

    return candidate;
  }

  public async reload(id: ID, device: IDevice, res: Response): Promise<void> {
    const options = FOGetSeance(id);
    const candidate = await this.getById(id, options);
    const user = candidate.user;
    const payload = this.tokenService.getPayloadByUser(user, id);
    const refreshNotBearer = this.tokenService.createRefresh(payload);
    const refresh = this.tokenService.addBearer(refreshNotBearer);
    const access = this.tokenService.createAccess(payload);

    await candidate.update({ ...device, token: refreshNotBearer });

    return this.cookieService.set(res, { access, refresh });
  }

  public async delete(userId: ID, current: ID, id?: ID): Promise<MSeance[]> {
    const options = FODeleteSeance(userId, current, id);
    const seances = await this.seance.findAll(options);

    for (const seance of seances) {
      await this.tokenService.blockedAccess(seance.id);
      await seance.destroy();
    }

    return this.getAll(userId);
  }

  public async logout(id: ID, res: Response): Promise<void> {
    await this.seance.destroy({ where: { id } });
    await this.tokenService.blockedAccess(id);

    return this.cookieService.clear(res);
  }

  public async findById(id: ID, options?: FindOptions) {
    return this.seance.findOne({ where: { id }, ...options });
  }

  public async findByUserId(userId: ID, options?: FindOptions) {
    return this.seance.findAll({ where: { userId }, ...options });
  }

  public get seanceNotFound(): HttpException {
    throw this.notFound('seance.not_found');
  }
}
