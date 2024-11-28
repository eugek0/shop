import { MRecipient } from '@modules/order/models';

export const RecipientResource = {
  resource: MRecipient,
  options: {
    navigation: 'Заказы',
    id: 'Получатели',
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
      email: {
        isTitle: true,
      },
      deletedAt: {
        isVisible: false,
      },
    },
  },
};
