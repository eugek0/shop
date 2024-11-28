import { ID } from '@common/types';
import { FindOptions, Op } from 'sequelize';

export const FODeleteSeance = (
  userId: ID,
  current: ID,
  id?: ID,
): FindOptions => ({
  where: {
    userId,
    id: {
      [Op.ne]: current,
      ...(id && { [Op.eq]: id }),
    },
  },
});
