import { ID } from '@common/types';
import { UserStatusEnum } from '@common/enums';
import { FindOptions } from 'sequelize';

export const FOGetUser = (id: ID, attributes: string[] = []): FindOptions => {
  const status = UserStatusEnum.active;

  return {
    where: { id, status },
    attributes: [
      'id',
      'email',
      'firstName',
      'lastName',
      'middleName',
      'phone',
      'avatar',
      'address',
      'dateOfBirth',
      ...attributes,
    ],
  };
};
