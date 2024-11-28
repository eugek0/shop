import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { IsNumberOptions } from 'class-validator/types/decorator/typechecker/IsNumber';
import { IsNumber as IsNumberValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Декоратор проверяет, что переданное значение является числом
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsNumber = (
  options?: IsNumberOptions,
  validationOptions?: ValidationOptions,
) => {
  return IsNumberValidation(options, {
    ...validationOptions,
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  });
};
