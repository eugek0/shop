import { isNil, isString } from '@nestjs/common/utils/shared.utils';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import {
  createParamDecorator,
  assignMetadata,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { validateQueryParam } from '@common/utils';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

/**
 * Декоратор используется для валидирование данных передаваемых в query параметрах
 *
 * Принимает:
 *  - Название параметра (String)
 *
 *  Добавляет в документацию:
 *  - Название параметра
 *  - Обязателен к заполнению
 *  - Тип данных на вход
 */

export const QueryValidate = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const query = req.query;
    const queryIsValid = query.hasOwnProperty(key);
    const status = HttpStatus.BAD_REQUEST;

    if (typeof key === 'undefined') return query;

    if (!queryIsValid)
      return Promise.reject(
        new HttpException(
          {
            statusCode: status,
            message: 'validation.NOT_EMPTY_QUERY',
            error: HttpErrorByCode[String(status)].name,
            args: { key },
          },
          status,
        ),
      );

    const value = validateQueryParam(key, query[key]);

    if (value instanceof HttpException) throw value;

    return value;
  },
  [
    (target, key: string, index) => {
      const args = Reflect.getMetadata(
        ROUTE_ARGS_METADATA,
        target.constructor,
        key,
      );
      for (const property in args) {
        const data = args[property].data;
        const hasParamData = isNil(data) || isString(data);
        const paramData = hasParamData && data;
        const paramPipes = [];

        Reflect.defineMetadata(
          ROUTE_ARGS_METADATA,
          assignMetadata(args, 4, index, paramData, ...paramPipes),
          target.constructor,
          key,
        );
      }
    },
  ],
);
