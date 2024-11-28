'use strict';

import getFiles from '../queries/files/file.insert.query';

const filesTable = 'files';

export default {
  async up(queryInterface) {
    const files = getFiles();

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(filesTable, files, {
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const files = getFiles();

    const fileIds = files.map((one) => one.id);

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        filesTable,
        { id: fileIds },
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
