import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultPayments = () => {
  return [
    {
      id: v4(),
      title: 'При получении',
      value: 'OnReceipt',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const getPayments = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultPayments(),
  );

export default getPayments;
