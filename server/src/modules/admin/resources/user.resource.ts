import { MUser } from '@modules/user/models';

export const UserResource = {
  resource: MUser,
  options: {
    id: 'Пользователи',
    properties: {
      id: {
        isVisible: {
          show: true,
          list: false,
          edit: false,
          filter: false,
        },
      },
      deletedAt: {
        isVisible: false,
      },
    },
    actions: {
      new: {
        isAccessible: false,
        isVisible: false,
      },
    },
  },
};
