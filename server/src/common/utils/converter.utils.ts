import ms = require('ms');

import {
  COUNT_MS_IN_MINUTE,
  COUNT_MS_IN_SECOND,
  COUNT_MS_IN_HOUR,
  COUNT_MS_IN_DAY,
} from '@common/constants';

import { TUnit } from '@common/types';

/**
 * Функция перевода интервалов времени вида 30s 10m 1h 30d в числовое представление с учетом единицы измерения.
 *
 * s - секунды
 * m - минуты
 * h - часы
 * d - дни
 *
 * Принимает:
 *  - Интервал времени (10s 15m 3h 10d).
 *  - Единицу измерения ответа (s m h d).
 *
 * Возврашает:
 *  - Числовое представление интервала.
 *
 * Пример:
 *  Передано 1h и s, вернется 3600
 *  Передано 1h и m вернутся 60
 */

export const converterFromExp = (exp: string, unit: TUnit): number => {
  const msByExp = ms(exp);
  switch (unit) {
    case 's':
      return msByExp / COUNT_MS_IN_SECOND;
    case 'm':
      return msByExp / COUNT_MS_IN_MINUTE;
    case 'h':
      return msByExp / COUNT_MS_IN_HOUR;
    case 'd':
      return msByExp / COUNT_MS_IN_DAY;
    default:
      return msByExp;
  }
};
