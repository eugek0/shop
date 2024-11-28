import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { IsString as IsStringValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Декоратор проверяет, что переданное значение является строкой
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsString = (validationOptions?: ValidationOptions) => {
  return IsStringValidation({
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_STRING'),
  });
};
