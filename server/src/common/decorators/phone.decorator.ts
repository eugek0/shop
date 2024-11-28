import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Matches } from 'class-validator';

import { PHONE_REG_EXP } from '@common/constants';

/**
 * Декоратор проверяет, что переданное значение является номером телефона
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsPhone = (validationOptions?: ValidationOptions) => {
  return Matches(PHONE_REG_EXP, {
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_PHONE'),
  });
};
