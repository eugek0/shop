import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import { ErrorService } from '@common/errors';

import { OrderStatus } from '@modules/order/enum';

import {
  MOrder,
  MOrderHistoryStatus,
  MOrderStatus,
} from '@modules/order/models';

import { ID, TSchema } from '@common/types';

@Injectable()
export class OrderHistoryService extends ErrorService {
  constructor(
    @InjectModel(MOrderStatus) private status: typeof MOrderStatus,
    @InjectModel(MOrder) private order: typeof MOrder,
    @InjectModel(MOrderHistoryStatus)
    private history: typeof MOrderHistoryStatus,
    private readonly configService: ConfigService<TSchema>,
  ) {
    super();
    this.addHooks();
  }

  private async getStatuses(): Promise<MOrderStatus[]> {
    const stasuses = await this.status.findAll({
      where: {
        value: { [Op.in]: this.mockedValidStatuses },
      },
      order: ['createdAt'],
    });

    return stasuses.map((status) => status.toJSON<MOrderStatus>());
  }

  private async mockedHistoryStatuses(order: MOrder): Promise<void> {
    if (!this.isMocked) return;

    const statuses = await this.getStatuses();

    statuses.forEach(({ id }, number) => {
      this.updateStatus(order, id, this.timeInterval * ++number);
    });
  }

  private updateStatus(order: MOrder, statusId: ID, time: number): void {
    setTimeout(() => {
      order.update({
        statusId,
      });
    }, time);
  }

  private async create(orderId: ID, statusId: ID): Promise<void> {
    await this.history.create({ orderId, statusId });
  }

  private async handlerUpdatePrice(order: MOrder): Promise<void> {
    const current = order.toJSON<MOrder>();

    const previous = order['_previousDataValues'];

    if (current.statusId === previous.statusId) return;

    const { id, statusId } = current;

    return this.create(id, statusId);
  }

  private async addHooks() {
    await this.order.addHook('afterUpdate', async (order: MOrder) => {
      await this.handlerUpdatePrice(order);
    });

    await this.order.addHook('afterCreate', (order: MOrder) => {
      const { id, statusId } = order.toJSON<MOrder>();
      this.create(id, statusId);
      this.mockedHistoryStatuses(order);
    });
  }

  private get timeInterval(): number {
    return this.configService.get('INTERVAL_TIME_MOCKED_STATUSES');
  }

  private get isMocked(): boolean {
    return this.configService.get('IS_MOCKED_STATUSES');
  }

  private get mockedValidStatuses(): OrderStatus[] {
    return [
      OrderStatus.created,
      OrderStatus.build,
      OrderStatus.collected,
      OrderStatus.awaitingDelivery,
      OrderStatus.payment,
      OrderStatus.retrieved,
      OrderStatus.completed,
    ];
  }
}
