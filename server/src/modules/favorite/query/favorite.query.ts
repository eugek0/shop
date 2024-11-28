import sequelize, { FindOptions, Sequelize } from 'sequelize';

import { parseIdForSubQuery } from '@modules/product/query';

import { MFavorite } from '@modules/favorite/models';
import { MDiscount } from '@modules/discount/models';
import { MMotive } from '@modules/motive/models';
import { MVolume } from '@modules/volume/models';
import { MGender } from '@modules/gender/models';

import { ID } from '@common/types';

export const getFavorites = (userId: ID): FindOptions => ({
  attributes: [
    'id',
    'title',
    'price',
    'images',
    'priceDiscount',
    'priceWithDiscount',
    'quantity',
    [
      sequelize.literal(`(
                    SELECT true
                )`),
      'isFavorite',
    ],
    [Sequelize.literal(`"images"[1]`), 'preview'],
    [
      sequelize.literal(`(
                    SELECT NOT COUNT(*) = 0
                    FROM "MCarts"
                    WHERE
                        "MCarts"."userId" = ${parseIdForSubQuery(userId)}
                        AND
                        "MCarts"."productId" = "MProduct"."id"
                        AND
                        "MCarts"."deletedAt" IS NULL
                )`),
      'isAddedToCart',
    ],
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
      attributes: ['id', 'title', 'abbreviation'],
    },
    {
      model: MFavorite,
      where: { userId },
      attributes: [],
    },
    {
      model: MDiscount,
      required: false,
      attributes: ['id', 'title', 'value'],
    },
  ],
});
