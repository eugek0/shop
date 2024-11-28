import { MDiscount } from '@modules/discount/models';

export const DiscountResource = {
  resource: MDiscount,
  options: {
    navigation: 'Продукция',
    id: 'Скидки',
    properties: {
      id: {
        isVisible: {
          show: true,
          list: false,
          edit: false,
          filter: false,
        },
      },
      value: {
        isVisible: {
          show: false,
          list: false,
          edit: true,
          new: true,
          filter: false,
        },
      },
      title: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          new: false,
          filter: true,
        },
      },
      deletedAt: {
        isVisible: false,
      },
    },
  },
};
