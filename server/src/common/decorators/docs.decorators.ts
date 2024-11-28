import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

import { TDocsType } from '@common/types';

/**
 * Декоратор используется для документирования запросов в Swagger
 *
 * Принимает:
 *  - Описание (String).
 *  - Ответ сервера (dto, model, object, string and etc).
 *
 * Добавляет в документацию:
 *  - Ответ сервера.
 *  - Описание к запросу в документации.
 *  - Возможен возврат ошибки 500 при некорректной обработке запроса.
 *  - Возможен возврат ошибки 400 при содержании некорретных данных в body или query param запроса.
 */

export const Docs = (description: string, docsType?: TDocsType) => {
  const isArray = Array.isArray(docsType);
  const type = isArray ? docsType[0] : docsType;

  return applyDecorators(
    ApiOperation({ description }),
    ApiOkResponse({ type, isArray }),
    ApiResponse({
      description: 'Critical error.',
      status: 500,
    }),
    ApiResponse({
      description: 'Invalid body or query.',
      status: 400,
    }),
  );
};
