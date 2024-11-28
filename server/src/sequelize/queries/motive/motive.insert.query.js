import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultMotives = () => [
  {
    id: v4(),
    title: 'По мотивам Chanel Allure Homme Sport',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    title: 'масляные духи (5шт/набор)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getMotives = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultMotives(),
  );

export default getMotives;
