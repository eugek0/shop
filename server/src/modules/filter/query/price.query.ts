import sequelize, { FindOptions } from 'sequelize';

export const FOPricesFilter = (): FindOptions => ({
  attributes: [
    [sequelize.fn('MAX', sequelize.col('price')), 'max'],
    [sequelize.fn('MIN', sequelize.col('price')), 'min'],
  ],
});
