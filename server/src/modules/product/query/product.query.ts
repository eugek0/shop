import sequelize, { FindOptions, Op, Sequelize } from 'sequelize';

import { MPriceHistory, MProduct } from '@modules/product/models';
import { MDiscount } from '@modules/discount/models';
import { MVolume } from '@modules/volume/models';
import { MGender } from '@modules/gender/models';
import { MReport } from '@modules/report/models';
import { MMotive } from '@modules/motive/models';
import { MColor } from '@modules/color/models';
import { MUser } from '@modules/user/models';
import { MType } from '@modules/type/models';

import { FilterDto } from '@modules/product/dto';

import { OrderEnum } from '@modules/product/enums';

import { ID } from '@common/types';

export const getProducts = (filter: FilterDto, userId: ID): FindOptions => {
  const {
    maxPrice,
    minPrice = 0,
    limit,
    page,
    genderId = null,
    typeId = null,
    volumeId = null,
    colorId = null,
    motiveId = null,
    title,
    order,
    isDiscount = false,
  } = filter;

  const offset = page * limit - limit;

  return {
    where: {
      price: {
        [Op.between]: [minPrice, maxPrice],
      },
      title: {
        [Op.iLike]: `%${title}%`,
      },
      ...(volumeId && { volumeId }),
      ...(genderId && { genderId }),
      ...(motiveId && { motiveId }),
      ...(colorId && { colorId }),
      ...(typeId && { typeId }),
    },
    offset,
    limit,
    order: parseOrder(order),
    attributes: [
      'id',
      'title',
      'price',
      'images',
      'quantity',
      'priceDiscount',
      'priceWithDiscount',
      [Sequelize.literal(`"MProduct"."images"[1]`), 'preview'],
      [
        sequelize.literal(`(
                    SELECT NOT COUNT(*) = 0
                    FROM "MFavorites"
                    WHERE
                        "MFavorites"."userId" = ${parseIdForSubQuery(userId)}
                        AND
                        "MFavorites"."productId" = "MProduct"."id"
                        AND 
                        "MFavorites"."deletedAt" IS NULL
                )`),
        'isFavorite',
      ],
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
        model: MDiscount,
        required: isDiscount,
        attributes: ['id', 'value', 'title'],
      },
    ],
  };
};

export const getProduct = (id: ID, userId = null): FindOptions => ({
  where: { id },
  attributes: [
    'id',
    'title',
    'price',
    'description',
    'priceDiscount',
    'priceWithDiscount',
    'quantity',
    'images',
    [Sequelize.literal(`"MProduct"."images"[1]`), 'preview'],
    [
      sequelize.literal(`(
                    SELECT NOT COUNT(*) = 0
                    FROM "MFavorites"
                    WHERE
                        "MFavorites"."userId" = ${parseIdForSubQuery(userId)}
                        AND
                        "MFavorites"."productId" = ${parseIdForSubQuery(id)}
                        AND 
                        "MFavorites"."deletedAt" IS NULL
                )`),
      'isFavorite',
    ],
    [
      sequelize.literal(`(
                    SELECT NOT COUNT(*) = 0
                    FROM "MCarts"
                    WHERE
                        "MCarts"."userId" = ${parseIdForSubQuery(userId)}
                        AND
                        "MCarts"."productId" = ${parseIdForSubQuery(id)}
                        AND 
                        "MCarts"."deletedAt" IS NULL
                )`),
      'isAddedToCart',
    ],
  ],
  include: [
    {
      model: MVolume,
      attributes: ['id', 'title'],
    },
    {
      model: MGender,
      attributes: ['id', 'title', 'abbreviation'],
    },
    {
      model: MColor,
      attributes: ['id', 'title'],
    },
    {
      model: MType,
      attributes: [
        'id',
        'title',
        'topNotes',
        'middleNotes',
        'lowNotes',
        'sentiment',
      ],
    },
    {
      model: MMotive,
      attributes: ['id', 'title'],
    },
    {
      model: MDiscount,
      attributes: ['id', 'title', 'value'],
      required: false,
    },
    {
      model: MPriceHistory,
      attributes: ['value', 'createdAt'],
    },
    {
      model: MReport,
      attributes: ['id', 'message', 'images', 'createdAt'],
      include: [
        {
          model: MUser,
          attributes: ['id', 'avatar', 'firstName', 'lastName', 'email'],
        },
      ],
    },
  ],
});

export const parseOrder = (
  order: OrderEnum,
): [[keyof MProduct, 'ASC' | 'DESC']] | [] => {
  switch (order) {
    case OrderEnum.DOWN_PRICE:
      return [['price', 'DESC']];
    case OrderEnum.UP_PRICE:
      return [['price', 'ASC']];
    default:
      return [];
  }
};

export const parseIdForSubQuery = (userId) =>
  userId ? `\'${userId}\'` : userId;
