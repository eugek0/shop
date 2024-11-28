import { MNavigation } from '@modules/navigation/models';

import { isAdmin } from '@modules/admin/utils';
import { Components } from '@modules/admin/components';
import { BASE_FILES_URL } from '@common/constants';
export const NavigationResource = {
  resource: MNavigation,
  options: {
    id: 'Навигация',
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
      image: {
        position: 5,
        components: {
          show: Components.MyNavigationImage,
          list: Components.MyNavigationImage,
        },
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: false,
        },
        props: {
          baseUrl: BASE_FILES_URL,
        },
      },
      colorId: {
        isId: true,
        reference: 'Цвета коллекций',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      typeId: {
        isId: true,
        reference: 'Типы ароматов',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      genderId: {
        isId: true,
        reference: 'Для кого',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      motiveId: {
        isId: true,
        reference: 'Мотивы',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      volumeId: {
        isId: true,
        reference: 'Объемы',
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      createdAt: {
        isVisible: {
          show: true,
          list: false,
          edit: true,
          filter: true,
        },
      },
      updatedAt: {
        isVisible: {
          show: true,
          list: false,
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
