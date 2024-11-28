import uploadFeature from '@adminjs/upload';
import { MFile } from '@modules/admin/models';
import { Components } from '@modules/admin/components';
import { BASE_FILES_URL } from '@common/constants';

const localProvider = {
  bucket: 'uploads',
  opts: {
    baseUrl: '/',
  },
};

export const FileResource = {
  resource: MFile,
  options: {
    id: 'Изображения',
    properties: {
      id: {
        isVisible: {
          show: true,
          list: false,
          edit: false,
          filter: false,
        },
      },
      title: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
      },
      comment: {
        type: 'textarea',
        isVisible: {
          show: true,
          list: false,
          edit: true,
          filter: false,
        },
      },
      size: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: false,
        },
      },
      file: {
        components: {
          list: Components.MyPreview,
          show: Components.MyPreview,
        },
        props: {
          baseUrl: BASE_FILES_URL,
          pattern: 'title',
        },
      },
      mime: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: false,
        },
      },
      deletedAt: {
        isVisible: false,
      },
    },
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      properties: {
        key: 'image',
        filename: 'title',
        mimeType: 'mime',
        size: 'size',
      },
      uploadPath: (record, filename) => filename,
      validation: { mimeTypes: ['image/png', 'image/jpg'] },
    }),
  ],
};
