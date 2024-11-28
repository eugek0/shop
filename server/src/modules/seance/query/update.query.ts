import { FindOptions } from 'sequelize';

import { MUser } from '@modules/user/models';

import { ID } from '@common/types';

export const FOGetSeance = (id: ID): FindOptions => ({
  where: { id },
  include: {
    model: MUser,
    required: true,
  },
});
