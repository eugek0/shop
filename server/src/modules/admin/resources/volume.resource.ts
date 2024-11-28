import { MVolume } from '@modules/volume/models';

export const VolumeResource = {
  resource: MVolume,
  options: {
    navigation: 'Категории продукции',
    id: 'Объемы',
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
