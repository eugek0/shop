import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { IsEnum as IsEnumValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Декоратор проверяет, что переданное значение является enum
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsEnum = (
  entity: object,
  validationOptions?: ValidationOptions,
) => {
  return IsEnumValidation(entity, {
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_ENUM'),
  });
};
