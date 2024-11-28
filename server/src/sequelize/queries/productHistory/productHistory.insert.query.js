import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

import getProducts from '../product/product.insert.query';
import getDiscounts from '../discount/discount.insert.query';

const DOWN_VALUE = 0.5;
const UP_VALUE = 1.5;

const defaultDates = [
  '2023-04-01T11:14:07.180Z',
  '2023-04-05T11:14:07.180Z',
  '2023-04-10T11:14:07.180Z',
  '2023-04-16T11:14:07.180Z',
  '2023-04-20T11:14:07.180Z',
  '2023-04-23T11:14:07.180Z',
  '2023-04-27T11:14:07.180Z',
];

const roundToNearest10 = (number) => Math.round(number / 10) * 10;
const getMinPrice = (price) => roundToNearest10(price * DOWN_VALUE);
const getMaxPrice = (price) => roundToNearest10(price * UP_VALUE);

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rawRandom = Math.floor(Math.random() * (max - min + 1)) + min;

  return roundToNearest10(rawRandom);
};

const generateHistory = (product) => {
  const price = product.price;
  const productId = product.id;
  const max = getMaxPrice(price);
  const min = getMinPrice(price);
  const updatedAt = new Date().toISOString();

  return defaultDates.map((createdAt, index) => {
    const isEnd = defaultDates.length === ++index;
    const value = isEnd
      ? priceWithDiscount(product)
      : getRandomIntInclusive(min, max);

    return {
      id: v4(),
      createdAt,
      updatedAt,
      productId,
      value,
    };
  });
};

const priceWithDiscount = ({ price, discountId }) => {
  if (!discountId) return price;

  const discount = discounts.find(({ id }) => id === discountId);
  const priceWithDiscount = price * (discount.value / 100);

  return roundToNearest10(priceWithDiscount);
};
const discounts = getDiscounts();

const defaultHistoryProducts = () => {
  const products = getProducts();

  return products.map(generateHistory).flat();
};

const getHistoryProducts = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultHistoryProducts(),
  );

export default getHistoryProducts;
