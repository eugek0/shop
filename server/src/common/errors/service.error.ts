import { HttpException, HttpStatus } from '@nestjs/common';

import { IArgs, TLocalizePath } from '@common/types';

export class ErrorService {
  public notFound(key: TLocalizePath, args?: IArgs): HttpException {
    throw this.getException(key, HttpStatus.NOT_FOUND, args);
  }

  public deleted(key: TLocalizePath, args?: IArgs): HttpException {
    throw this.getException(key, HttpStatus.OK, args);
  }

  public alreadyExist(key: TLocalizePath, args?: IArgs): HttpException {
    throw this.getException(key, HttpStatus.BAD_REQUEST, args);
  }

  public get accessError(): HttpException {
    throw this.getException('seance.access.not_valid', HttpStatus.UNAUTHORIZED);
  }

  public get refreshError(): HttpException {
    throw this.getException('seance.refresh.not_valid', 498);
  }

  public get userIncorrect(): HttpException {
    throw this.badRequest(`user.incorrect`);
  }

  public get errorConfirmCode(): HttpException {
    throw this.badRequest('user.incorrect');
  }

  public invalidSendEmail(key: TLocalizePath, args?: IArgs): HttpException {
    throw this.getException(key, HttpStatus.BAD_REQUEST, args);
  }

  public badRequest(key: TLocalizePath, args?: IArgs): HttpException {
    throw this.getException(key, HttpStatus.BAD_REQUEST, args);
  }

  private getException(
    key: TLocalizePath,
    status: number,
    args?: IArgs,
  ): HttpException {
    throw new HttpException(
      {
        statusCode: status,
        message: key,
        args,
      },
      status,
    );
  }
}
