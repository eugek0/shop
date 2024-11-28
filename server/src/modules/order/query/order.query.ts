import { FindOptions, Sequelize } from 'sequelize';
import {
  MDelivery,
  MOrderHistoryStatus,
  MOrderProduct,
  MOrderStatus,
  MPayment,
  MRecipient,
} from '@modules/order/models';
import { ID } from '@common/types';
import { MProduct } from '@modules/product/models';
import { MMotive } from '@modules/motive/models';
import { MVolume } from '@modules/volume/models';
import { MGender } from '@modules/gender/models';

export const getOrders = (userId: ID, id: ID | null = null): FindOptions => ({
  attributes: [
    'id',
    'totalPrice',
    'totalPriceDiscount',
    'totalPriceWithDiscount',
    'createdAt',
  ],
  where: id ? { id, userId } : { userId },
  include: [
    {
      model: MOrderProduct,
      paranoid: false,
      attributes: [
        'id',
        'price',
        'priceDiscount',
        'priceWithDiscount',
        'count',
      ],
      include: [
        {
          model: MProduct,
          paranoid: false,
          attributes: [
            'id',
            'title',
            [Sequelize.literal(`"products->product"."images"[1]`), 'preview'],
          ],
          include: [
            {
              paranoid: false,
              model: MMotive,
              attributes: ['id', 'title'],
            },
            {
              paranoid: false,
              model: MVolume,
              attributes: ['id', 'title'],
            },
            {
              paranoid: false,
              model: MGender,
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    },
    {
      paranoid: false,
      model: MOrderHistoryStatus,
      attributes: ['id', 'createdAt'],
      include: [
        {
          paranoid: false,
          model: MOrderStatus,
          attributes: ['id', 'title'],
        },
      ],
    },
    {
      model: MOrderStatus,
      paranoid: false,
      attributes: ['id', 'title'],
    },
    {
      paranoid: false,
      model: MRecipient,
      attributes: [
        'id',
        'firstName',
        'lastName',
        'middleName',
        'email',
        'phone',
      ],
    },
    {
      paranoid: false,
      model: MDelivery,
      attributes: ['id', 'title'],
    },
    {
      paranoid: false,
      model: MPayment,
      attributes: ['id', 'title'],
    },
  ],
});
