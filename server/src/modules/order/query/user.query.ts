import { ID } from '@common/types';
import { FindOptions } from 'sequelize';

export const getRecipientByUser = (id: ID): FindOptions => ({
  where: { id },
  attributes: ['firstName', 'lastName', 'middleName', 'email', 'phone'],
});
