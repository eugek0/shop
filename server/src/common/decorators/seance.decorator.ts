import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

import { RefreshGuard } from '@modules/tokens/guards';

import { CookieEnum } from '@common/enums';

/**
 * Декоратор проверяет, что refresh токен, предоставленный в cookie,
 * является действительным и документирует заголовок request и возможные ответы сервера.
 *
 * Добавляет в документацию:
 *  - Обязательный заголовок Cookie.
 *  - Возможен возврат ошибки Refresh token is not valid со статусом 498.
 */

export const Seance = () =>
  applyDecorators(
    UseGuards(RefreshGuard),
    ApiHeader({
      name: 'Cookie',
      required: true,
      example: `${CookieEnum.refresh}=Bearer token`,
    }),
    ApiResponse({
      description: `Refresh token is not valid.`,
      status: 498,
    }),
  );
