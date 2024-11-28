import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { OrderController } from '@modules/order/controllers';

import { OrderHistoryService, OrderService } from '@modules/order/services';

import {
  MOrderHistoryStatus,
  MOrderProduct,
  MOrderStatus,
  MRecipient,
  MDelivery,
  MPayment,
  MOrder,
} from '@modules/order/models';
import { MCart } from '@modules/cart/models';
import { MUser } from '@modules/user/models';
import { MProduct } from '@modules/product/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MOrderHistoryStatus,
      MOrderProduct,
      MOrderStatus,
      MRecipient,
      MDelivery,
      MPayment,
      MProduct,
      MOrder,
      MCart,
      MUser,
    ]),
  ],
  providers: [OrderService, OrderHistoryService],
  controllers: [OrderController],
  exports: [],
})
export class OrderModule {}
