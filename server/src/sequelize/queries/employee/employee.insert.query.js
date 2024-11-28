import path from 'path';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import Saver from '../Saver';
import getPositions from '../position/position.insert.query';

const findByTitle = (items, title) => {
  const candidate = items.find((item) => item.title === title);
  return candidate['id'] || null;
};

const defaultEmployees = () => [
  {
    id: v4(),
    email: process.env.ADMIN_EMAIL,
    password: bcrypt.hashSync(
      process.env.ADMIN_PASSWORD,
      +process.env.HASH_SALT_ROUNDS,
    ),
    lastName: 'Имя',
    firstName: 'Фамилия',
    middleName: 'Отчество',
    avatar: 'https://clck.ru/348gmn',
    positionId: findByTitle(getPositions(), 'Администратор'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getEmployees = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultEmployees(),
  );

export default getEmployees;
