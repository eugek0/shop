import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ID } from '@common/types';

export const SeanceId = createParamDecorator(
  (data: never | undefined, ctx: ExecutionContext): ID => {
    const { user } = ctx.switchToHttp().getRequest();
    const { jti } = user;

    return jti;
  },
);
