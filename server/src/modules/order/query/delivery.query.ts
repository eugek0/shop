import { FindOptions } from 'sequelize';

export const getDelivery = (): FindOptions => ({
  attributes: ['id', 'title'],
});
