import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultVolumes = () => [
  {
    id: v4(),
    title: '3 ML',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: '60 ML',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: '100 ML',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getVolumes = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultVolumes(),
  );

export default getVolumes;
