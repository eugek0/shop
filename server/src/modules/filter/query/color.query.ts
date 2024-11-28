import { FindOptions } from 'sequelize';

export const FOColorsFilter = (): FindOptions => ({
  attributes: ['id', 'title'],
});
