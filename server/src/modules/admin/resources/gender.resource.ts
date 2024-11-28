import { MGender } from '@modules/gender/models';

export const GenderResource = {
  resource: MGender,
  options: {
    navigation: 'Категории продукции',
    id: 'Для кого',
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
