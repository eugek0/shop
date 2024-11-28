import { MType } from '@modules/type/models';

export const TypeResource = {
  resource: MType,
  options: {
    navigation: 'Категории продукции',
    id: 'Типы ароматов',
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
