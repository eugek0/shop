import path from 'path';
import { v4 } from 'uuid';

import Saver from '../Saver';

const defaultOrderStatuses = () => {
  return [
    {
      id: v4(),
      title: 'Создан',
      value: 'Created',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Сборка',
      value: 'Build',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Собран',
      value: 'Collected',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Ожидает вручения',
      value: 'WaitingToDelivery',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Оплачен',
      value: 'Payment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Получен',
      value: 'Retrieved',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Завершен',
      value: 'Completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Не оплачен',
      value: 'NotPayment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Ожидает доставки',
      value: 'WaitingToDelivery',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'В доставке',
      value: 'InDelivery',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      title: 'Отменен',
      value: 'Canceled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const getOrderStatuses = () =>
  Saver.processFile(
    path.dirname(__filename),
    path.basename(__filename),
    defaultOrderStatuses(),
  );

export default getOrderStatuses;
