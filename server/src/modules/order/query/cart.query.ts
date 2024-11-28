import { FindOptions, Sequelize } from 'sequelize';

import { MProduct } from '@modules/product/models';
import { MMotive } from '@modules/motive/models';
import { MVolume } from '@modules/volume/models';
import { MGender } from '@modules/gender/models';

import { ID } from '@common/types';

export const getProductsInCart = (
  userId: ID,
  exclude: string[],
): FindOptions => ({
  attributes: [
    'productId',
    'productPrice',
    'count',
    'productDiscount',
    'price',
    'priceWithDiscount',
    'priceDiscount',
    'userId',
  ].filter((attribute) => !exclude.includes(attribute)),
  where: { userId },
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
