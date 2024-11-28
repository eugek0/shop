import { FindOptions } from 'sequelize';

export const FOTypesFilter = (): FindOptions => ({
  attributes: ['id', 'title'],
});
