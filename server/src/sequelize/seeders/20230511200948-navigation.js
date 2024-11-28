'use strict';

import getNavigations from '../queries/navigation/navigation.insert.query';

const navigationTable = 'MNavigations';

export default {
  async up(queryInterface) {
    const navigations = getNavigations();

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(navigationTable, navigations, {
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const navigations = getNavigations();

    const navigationIds = navigations.map((one) => one.id);

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        navigationTable,
        { id: navigationIds },
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
