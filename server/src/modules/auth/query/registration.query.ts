import { FindOptions } from 'sequelize';

export const FORegistration = (email: string): FindOptions => ({
  where: { email },
  attributes: ['id', 'email'],
});
