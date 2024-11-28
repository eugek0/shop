import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

import { DIR_UPLOADS } from '@common/constants';
import { ErrorService } from '@common/errors';

@Injectable()
export class FilesService extends ErrorService {
  public async getFile(name: string, res: Response): Promise<HttpException> {
    const candidate = fs.existsSync(DIR_UPLOADS + name);

    if (!candidate) this.notFound('file.not_found');

    await res.sendFile(name, { root: './uploads' }, (err) => err);

    return new HttpException(res, HttpStatus.OK);
  }
}
