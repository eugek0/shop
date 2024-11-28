import { ApiHeader, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { applyDecorators, UseGuards } from '@nestjs/common';

import { AccessGuard, AccessOptionalGuard } from '@modules/tokens/guards';

/**
 * Декоратор проверяет, что access токен, предоставленный в заголовке Authorization,
 * является действительным и документирует заголовок request и возможные ответы сервера.
 *
 * Принимает:
 *  - Булевое значение, определяющее обязательность авторизации пользователя
 *
 * Добавляет в документацию:
 *  - Обязательный заголовок Authorization
 *  - Возможен возврат ошибки UnAuthorized
 */

export const Authorize = (required = true) =>
  applyDecorators(
    ApiHeader({
      example: 'Bearer token',
      name: 'Authorization',
      required: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Access token is not valid',
    }),
    UseGuards(required ? AccessGuard : AccessOptionalGuard),
  );
