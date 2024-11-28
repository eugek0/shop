import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultDiscounts = () => [
  {
    id: v4(),
    value: 5,
    title: `5%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 10,
    title: `10%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 15,
    title: `15%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 20,
    title: `20%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 25,
    title: `25%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 30,
    title: `30%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 35,
    title: `35%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 40,
    title: `40%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 45,
    title: `45%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: v4(),
    value: 50,
    title: `50%`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getDiscounts = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultDiscounts(),
  );

export default getDiscounts;
