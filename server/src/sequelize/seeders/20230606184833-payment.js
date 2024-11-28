'use strict';

import getPayments from '../queries/payment/payment.insert.query';

const paymentTable = 'MPayments';

export default {
  async up(queryInterface) {
    const payments = getPayments();

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(paymentTable, payments, {
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const payments = getPayments();

    const paymentIds = payments.map((one) => one.id);

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        paymentTable,
        { id: paymentIds },
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
