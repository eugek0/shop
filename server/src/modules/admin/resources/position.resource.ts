import { MPosition } from '@modules/admin/models';
import { isOwner } from '@modules/admin/utils';

export const PositionResource = {
  resource: MPosition,
  options: {
    navigation: 'Штат компании',
    id: 'Должности',
    actions: {
      new: {
        isAccessible: isOwner,
      },
      delete: {
        isAccessible: isOwner,
      },
      bulkDelete: {
        isAccessible: isOwner,
      },
      edit: {
        isAccessible: isOwner,
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
      deletedAt: {
        isVisible: false,
      },
    },
  },
};
