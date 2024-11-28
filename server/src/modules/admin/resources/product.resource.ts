import { MProduct } from '@modules/product/models';
import { Components } from '@modules/admin/components';
import { BASE_FILES_URL } from '@common/constants';

export const ProductResource = {
  resource: MProduct,
  options: {
    navigation: 'Продукция',
    id: 'Товары',
    properties: {
      id: {
        isVisible: {
          show: false,
          list: false,
          edit: false,
          filter: false,
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
      images: {
        position: 3,
        isDraggable: true,
        isArray: true,
        description: 'Изображение №1 будет главным',
        components: {
          show: Components.MyImage,
          list: Components.MyPreview,
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
        reference: 'Цвета коллекций',
        isId: true,
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      volumeId: {
        reference: 'Объемы',
        isId: true,
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      genderId: {
        reference: 'Для кого',
        isId: true,
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      discountId: {
        reference: 'Скидки',
        isId: true,
        isVisible: {
          show: true,
          list: true,
          edit: true,
          filter: true,
        },
      },
      price: {
        type: 'number',
      },
      description: {
        type: 'textarea',
        isVisible: {
          show: true,
          list: false,
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
