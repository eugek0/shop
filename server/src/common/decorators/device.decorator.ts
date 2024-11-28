import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { getDeviceInfoByHeaders, getGeoByIp } from '@common/utils';

import { IDevice } from '@common/types';

import { IP_REG_EXP } from '@common/constants';

export const Device = createParamDecorator(
  (data: never | undefined, ctx: ExecutionContext): IDevice => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const rawIp = <string>req.headers['x-real-ip'];
    const ip = IP_REG_EXP.test(rawIp) ? rawIp : null;

    const device = getDeviceInfoByHeaders(req.headers);
    const geo = getGeoByIp(ip);

    return {
      ...device,
      ...geo,
      ip,
    };
  },
);
