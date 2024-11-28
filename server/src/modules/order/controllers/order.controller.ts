import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';

import { Authorize, Docs, QueryValidate, UserID } from '@common/decorators';
import { transaction } from '@common/utils';

import { OrderService } from '@modules/order/services';

import { CreateOrder } from '@modules/order/dto';

import {
  DOrderStatus,
  RequestOrder,
  DDelivery,
  DPayment,
  DOrder,
  getOrderStatuses,
  getRequestOrder,
  getDeliveries,
  getPayments,
  getOrders,
  getOrder,
} from '@modules/order/docs';

import { ID } from '@common/types';

@Controller('order')
@Authorize()
@ApiTags('Order')
export class OrderController {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly orderService: OrderService,
  ) {}

  @Docs(getRequestOrder, RequestOrder)
  @Get('request')
  request(@UserID() userId: ID): Promise<any> {
    return this.orderService.request(userId);
  }

  @Docs(getOrders, [DOrder])
  @Post()
  create(@Body() dto: CreateOrder, @UserID() userId: ID) {
    return transaction(this.sequelize, () =>
      this.orderService.create(dto, userId),
    );
  }

  @Docs(getOrders, [DOrder])
  @Get('all')
  getOrders(@UserID() userId: ID): Promise<DOrder[]> {
    return this.orderService.getOrders(userId);
  }

  @Docs(getOrder, DOrder)
  @Get()
  getOrder(@UserID() userId: ID, @QueryValidate('id') id: ID): Promise<DOrder> {
    return this.orderService.getOrder(userId, id);
  }

  @Docs(getOrderStatuses, [DOrderStatus])
  @Get('status')
  getStatuses(): Promise<DOrderStatus[]> {
    return this.orderService.getStatuses();
  }

  @Docs(getPayments, [DPayment])
  @Get('payment')
  getPayments(): Promise<DPayment[]> {
    return this.orderService.getPayments();
  }

  @Docs(getDeliveries, [DDelivery])
  @Get('delivery')
  getDeliveries(): Promise<DDelivery[]> {
    return this.orderService.getDeliveries();
  }
}
