import { Controller, Delete, Patch, Query, Get, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { Response } from 'express';

import { Seance, Device, Docs, SeanceId, UserID } from '@common/decorators';

import { transaction } from '@common/utils';

import { SeanceService } from '@modules/seance/services';

import { MSeance } from '@modules/seance/models';

import { QueryDto } from '@modules/seance/dto';

import {
  deleteSeanceDocs,
  patchSeanceDocs,
  getSeanceDocs,
  logOut,
} from '@modules/seance/docs';

import { ID, IDevice } from '@common/types';

@Controller('seances')
@ApiTags('Seances')
@Seance()
export class SeanceController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly seanceService: SeanceService,
  ) {}

  @Docs(getSeanceDocs, [MSeance])
  @Get()
  getAll(@UserID() userId: ID) {
    return transaction(this.sequelize, () => this.seanceService.getAll(userId));
  }

  @Docs(patchSeanceDocs)
  @Patch()
  reload(@Device() device: IDevice, @SeanceId() id: ID, @Res() res: Response) {
    return transaction(this.sequelize, () =>
      this.seanceService.reload(id, device, res),
    );
  }

  @Docs(deleteSeanceDocs, [MSeance])
  @Delete()
  delete(
    @SeanceId() current: ID,
    @UserID() userId: ID,
    @Query() { id }: QueryDto,
  ): Promise<MSeance[]> {
    return transaction(this.sequelize, () =>
      this.seanceService.delete(userId, current, id),
    );
  }

  @Docs(logOut)
  @Get('logout')
  logOut(@SeanceId() id: ID, @Res() res: Response): Promise<void> {
    return transaction(this.sequelize, () =>
      this.seanceService.logout(id, res),
    );
  }
}
