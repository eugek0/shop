import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultGenders = () => [
  {
    id: v4(),
    title: 'МУЖЧИНАМ',
    abbreviation: 'men',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'ЖЕНЩИНАМ',
    abbreviation: 'women',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'УНИСЕКС',
    abbreviation: 'unisex',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getGenders = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultGenders(),
  );

export default getGenders;
