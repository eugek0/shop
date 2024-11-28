import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultDeliveries = () => {
  return [
    {
      id: v4(),
      title: 'Самовывоз',
      value: 'SelfDelivery',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const getDeliveries = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultDeliveries(),
  );

export default getDeliveries;
