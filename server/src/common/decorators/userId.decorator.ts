import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserID = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    return user?.id || null;
  },
);
