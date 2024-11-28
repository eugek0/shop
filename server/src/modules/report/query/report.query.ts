import { FindOptions } from 'sequelize';

import { ID } from '@common/types';

export const getReports = (productId: ID): FindOptions => ({
  where: { productId },
});
