import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultColors = () => [
  {
    id: v4(),
    title: 'КРАСНЫЙ',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'СИНИЙ',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'БЕЖЕВЫЙ',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'ГОЛУБОЙ',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'КОРАЛЛОВЫЙ',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getColors = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultColors(),
  );

export default getColors;
