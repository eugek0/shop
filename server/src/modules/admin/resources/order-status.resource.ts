import { MOrderStatus } from '@modules/order/models';

export const OrderStatusResource = {
  resource: MOrderStatus,
  options: {
    navigation: 'Заказы',
    id: 'Статусы',
    actions: {
      new: {
        isAccessible: false,
      },
      delete: {
        isAccessible: false,
      },
      bulkDelete: {
        isAccessible: false,
      },
      edit: {
        isAccessible: true,
      },
    },
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
          new: false,
          filter: false,
        },
      },
      title: {
        isTitle: true,
        isVisible: {
          show: true,
          list: true,
          edit: true,
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
