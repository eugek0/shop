import { FindOptions, Sequelize } from 'sequelize';

import { MProduct } from '@modules/product/models';
import { MMotive } from '@modules/motive/models';
import { MVolume } from '@modules/volume/models';
import { MGender } from '@modules/gender/models';

import { ID } from '@common/types';

export const getCartByUserId = (userId: ID, id: ID = null): FindOptions => ({
  where: id ? { userId, id } : { userId },
  attributes: [
    'id',
    'count',
    'maxCount',
    'price',
    'priceDiscount',
    'priceWithDiscount',
    'productPrice',
    'productDiscount',
  ],
  include: [
    {
      model: MProduct,
      attributes: [
        'id',
        'title',
        'quantity',
        [Sequelize.literal(`"product"."images"[1]`), 'preview'],
      ],
      include: [
        {
          model: MMotive,
          attributes: ['id', 'title'],
        },
        {
          model: MVolume,
          attributes: ['id', 'title'],
        },
        {
          model: MGender,
          attributes: ['id', 'title'],
        },
      ],
    },
  ],
});
