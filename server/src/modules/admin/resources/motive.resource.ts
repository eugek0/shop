import { MMotive } from '@modules/motive/models/motive.model';

export const MotiveResource = {
  resource: MMotive,
  options: {
    navigation: 'Категории продукции',
    id: 'Мотивы',
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
