import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultPositions = () => [
  {
    id: v4(),
    title: 'Владелец',
    value: 'owner',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: v4(),
    title: 'Менеджер',
    value: 'manager',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'Администратор',
    value: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getPositions = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultPositions(),
  );

export default getPositions;
