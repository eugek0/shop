import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsDateString } from 'class-validator';

/**
 * Декоратор проверяет, что переданное значение является датой стандарта ISO8601
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsDate = (
  options?: any,
  validationOptions?: ValidationOptions,
) => {
  return IsDateString(options, {
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_DATE'),
  });
};
