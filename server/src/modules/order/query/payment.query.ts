import { FindOptions } from 'sequelize';

export const getPayment = (): FindOptions => ({
  attributes: ['id', 'title'],
});
