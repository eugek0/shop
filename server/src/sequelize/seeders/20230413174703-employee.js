'use strict';

import getEmployees from '../queries/employee/employee.insert.query';
import getPositions from '../queries/position/position.insert.query';

const positionTable = 'MPositions';
const employeeTable = 'MEmployees';

export default {
  async up(queryInterface) {
    const positions = getPositions();
    const employees = getEmployees();

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(positionTable, positions, {
        transaction,
      });
      await queryInterface.bulkInsert(employeeTable, employees, {
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const positions = getPositions();
    const employees = getEmployees();

    const positionIds = positions.map((one) => one.id);
    const employeeIds = employees.map((one) => one.id);

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        employeeTable,
        { id: employeeIds },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        positionTable,
        { id: positionIds },
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
