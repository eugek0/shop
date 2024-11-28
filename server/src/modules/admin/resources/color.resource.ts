import { MColor } from '@modules/color/models';

export const ColorResource = {
  resource: MColor,
  options: {
    navigation: 'Категории продукции',
    id: 'Цвета коллекций',
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
