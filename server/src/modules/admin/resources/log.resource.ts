import { createLoggerResource } from '@adminjs/logger';

import { MLog } from '@modules/admin/models';

export const featureOptions = {
  resourceOptions: {
    resourceId: 'История изменений',
  },
  userIdAttribute: 'id',
  propertiesMapping: {
    user: 'employeeId',
  },
};

const config = {
  resource: MLog,
  featureOptions,
};

const rawLogResource = createLoggerResource(config);

rawLogResource.options.properties['employeeId'] = {
  isId: true,
  reference: 'Сотрудники',
};
export const LogResource = rawLogResource;
