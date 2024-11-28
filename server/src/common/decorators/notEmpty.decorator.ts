import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { IsNotEmpty as IsNotEmptyValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Декоратор проверяет, что переданное значение не является undefined
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsNotEmpty = (validationOptions?: ValidationOptions) => {
  return IsNotEmptyValidation({
    ...validationOptions,
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  });
};
