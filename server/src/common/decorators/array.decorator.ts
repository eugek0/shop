import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsArray as IsArrayValidation } from 'class-validator';

/**
 * Декоратор проверяет, что переданное значение является массивом
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsArray = (validationOptions?: ValidationOptions) => {
  return IsArrayValidation({
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_ARRAY'),
  });
};
