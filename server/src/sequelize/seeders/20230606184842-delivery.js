'use strict';

import getDeliveries from '../queries/delivery/delivery.insert.query';

const deliveryTable = 'MDeliveries';

export default {
  async up(queryInterface) {
    const deliveries = getDeliveries();

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(deliveryTable, deliveries, {
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const deliveries = getDeliveries();

    const deliveryIds = deliveries.map((one) => one.id);

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        deliveryTable,
        { id: deliveryIds },
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
