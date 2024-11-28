import { FindOptions } from 'sequelize';

export const FOGendersFilter = (): FindOptions => ({
  attributes: ['id', 'title'],
});
