import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { IsJSON as IsJSONValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Декоратор проверяет, что переданное значение является json
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsJSON = (validationOptions?: ValidationOptions) => {
  return IsJSONValidation({
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_JSON'),
  });
};
