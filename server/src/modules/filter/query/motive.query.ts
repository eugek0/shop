import { FindOptions } from 'sequelize';

export const FOMotivesFilter = (): FindOptions => ({
  attributes: ['id', 'title'],
});
