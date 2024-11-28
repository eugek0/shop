import { FindOptions } from 'sequelize';

export const FOVolumesFilter = (): FindOptions => ({
  attributes: ['id', 'title'],
});
