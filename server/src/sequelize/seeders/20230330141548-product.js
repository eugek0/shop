'use strict';

import getTypes from '../queries/type/type.insert.query';
import getColors from '../queries/color/color.insert.query';
import getGenders from '../queries/gender/gender.insert.query';
import getVolumes from '../queries/volume/volume.insert.query';
import getProducts from '../queries/product/product.insert.query';
import getMotives from '../queries/motive/motive.insert.query';
import getHistoryProducts from '../queries/productHistory/productHistory.insert.query';
import getDiscounts from '../queries/discount/discount.insert.query';

const colorTable = 'MColors';
const genderTable = 'MGenders';
const typeTable = 'MTypes';
const volumeTable = 'MVolumes';
const motiveTable = 'MMotives';
const productTable = 'MProducts';
const priceHistoryTable = 'MPriceHistories';
const discountTable = 'MDiscounts';

export default {
  async up(queryInterface) {
    const types = getTypes();
    const colors = getColors();
    const genders = getGenders();
    const volumes = getVolumes();
    const motives = getMotives();
    const discounts = getDiscounts();
    const products = getProducts();
    const priceHistories = getHistoryProducts();

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(discountTable, discounts, {
        transaction,
      });
      await queryInterface.bulkInsert(motiveTable, motives, {
        transaction,
      });
      await queryInterface.bulkInsert(colorTable, colors, {
        transaction,
      });
      await queryInterface.bulkInsert(typeTable, types, {
        transaction,
      });
      await queryInterface.bulkInsert(genderTable, genders, {
        transaction,
      });
      await queryInterface.bulkInsert(volumeTable, volumes, {
        transaction,
      });
      await queryInterface.bulkInsert(productTable, products, {
        transaction,
      });
      await queryInterface.bulkInsert(priceHistoryTable, priceHistories, {
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const types = getTypes();
    const colors = getColors();
    const genders = getGenders();
    const volumes = getVolumes();
    const motives = getMotives();
    const products = getProducts();

    const typeIds = types.map((one) => one.id);
    const colorIds = colors.map((one) => one.id);
    const genderIds = genders.map((one) => one.id);
    const volumeIds = volumes.map((one) => one.id);
    const motiveIds = motives.map((one) => one.id);
    const productIds = products.map((one) => one.id);

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        productTable,
        { id: motiveIds },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        productTable,
        { id: productIds },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        typeTable,
        { id: typeIds },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        colorTable,
        { id: colorIds },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        genderTable,
        { id: genderIds },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        volumeTable,
        { id: volumeIds },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        priceHistoryTable,
        { productId: productIds },
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
