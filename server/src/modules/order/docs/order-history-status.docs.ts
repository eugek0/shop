import { ApiProperty } from '@nestjs/swagger';

import { DocsClass } from '@common/decorators';

import { DOrderStatus } from '@modules/order/docs/order-status.docs';

import { ID } from '@common/types';

export class DOrderHistoryStatus {
  @ApiProperty({ type: String, example: '49a37307-96cc-49fd-9eff-5e287e6d805' })
  id: ID;

  @ApiProperty({ type: String, example: '2023-06-08T18:35:06.044Z' })
  createdAt: string;

  @DocsClass(DOrderStatus)
  status: DOrderStatus;
}
