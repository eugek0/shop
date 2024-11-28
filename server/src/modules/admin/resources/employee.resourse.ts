import { MEmployee } from '@modules/admin/models';
import { isAdmin } from '@modules/admin/utils';

export const EmployeeResource = {
  resource: MEmployee,
  options: {
    navigation: 'Штат компании',
    id: 'Сотрудники',
    actions: {
      new: {
        isAccessible: isAdmin,
      },
      delete: {
        isAccessible: isAdmin,
      },
      bulkDelete: {
        isAccessible: isAdmin,
      },
      edit: {
        isAccessible: isAdmin,
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
      positionId: {
        isId: true,
        reference: 'Должности',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      deletedAt: {
        isVisible: false,
      },
    },
  },
};
