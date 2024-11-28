'use strict';

import getOrderStatuses from '../queries/order-status/order-status.insert.query';

const orderStatusTable = 'MOrderStatuses';

export default {
  async up(queryInterface) {
    const orderStatuses = getOrderStatuses();

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(orderStatusTable, orderStatuses, {
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const orderStatuses = getOrderStatuses();

    const orderStatusIds = orderStatuses.map((one) => one.id);

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        orderStatusTable,
        { id: orderStatusIds },
        {
          transaction,
        },
      );

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
};
