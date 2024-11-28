import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenValue } from '@common/types';

export const Info = createParamDecorator(
  (data: keyof ITokenValue | undefined, ctx: ExecutionContext) => {
    const { info } = ctx.switchToHttp().getRequest();

    return data ? info[data] : info;
  },
);
