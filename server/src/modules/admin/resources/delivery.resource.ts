import { MDelivery } from '@modules/order/models';

export const DeliveryResource = {
  resource: MDelivery,
  options: {
    navigation: 'Заказы',
    id: 'Виды доставок',
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
          edit: false,
          new: false,
          filter: false,
        },
      },
      title: {
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
