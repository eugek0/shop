import { FindOptions } from 'sequelize';

export const getOrderStatus = (): FindOptions => ({
  attributes: ['id', 'title'],
});
