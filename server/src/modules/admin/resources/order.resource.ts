import { MOrder } from '@modules/order/models';
import { getOrderProducts } from '@modules/admin/hooks';
import { Components } from '@modules/admin/components';
import { getOrderStatuses } from '@modules/admin/hooks/statuses.hooks';

export const OrderResource = {
  resource: MOrder,
  options: {
    navigation: 'Заказы',
    id: 'Заказы',
    actions: {
      show: {
        after: [getOrderProducts(), getOrderStatuses()],
      },
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
      recipientId: {
        isId: true,
        reference: 'Получатели',
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
      },
      deliveryId: {
        isId: true,
        reference: 'Виды доставок',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      totalPriceWithDiscount: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
      },
      totalPriceDiscount: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
      },
      totalPrice: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
      },
      paymentId: {
        isId: true,
        reference: 'Виды оплаты',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      products: {
        isVisible: {
          edit: false,
          list: false,
          filter: false,
          show: true,
        },
        components: {
          show: Components.OrderProducts,
        },
        position: 999,
      },
      statuses: {
        isVisible: {
          edit: false,
          list: false,
          filter: false,
          show: true,
        },
        components: {
          show: Components.OrderStatuses,
        },
        position: 999,
      },
      statusId: {
        isId: true,
        reference: 'Статусы',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      userId: {
        isId: true,
        reference: 'Пользователи',
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
      },
      deletedAt: {
        isVisible: false,
      },
    },
  },
};
