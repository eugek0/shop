import { HttpException, HttpStatus } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export const isUuid = (candidate: string) =>
  uuidValidate(candidate) && uuidVersion(candidate) === 4;

export const validateQueryParam = (
  key: string,
  value: string,
): HttpException | string => {
  const statusCode = HttpStatus.BAD_REQUEST;
  const error = HttpErrorByCode[String(statusCode)].name;
  const args = { key };

  switch (true) {
    case typeof value === 'undefined':
      return new HttpException(
        {
          message: 'validation.NOT_EMPTY_QUERY',
          statusCode,
          error,
          args,
        },
        statusCode,
      );
    case value === 'undefined':
      return new HttpException(
        {
          message: 'validation.NOT_EMPTY_QUERY',
          statusCode,
          error,
          args,
        },
        statusCode,
      );
    case value === '':
      return new HttpException(
        {
          message: 'validation.NOT_EMPTY_QUERY',
          statusCode,
          error,
          args,
        },
        statusCode,
      );
    case key.includes('id'):
      const candidate = isUuid(value);

      if (!candidate) {
        return new HttpException(
          {
            message: 'validation.NOT_UUID_QUERY',
            statusCode,
            error,
            args,
          },
          statusCode,
        );
      }

      return value;
    default:
      return value;
  }
};
