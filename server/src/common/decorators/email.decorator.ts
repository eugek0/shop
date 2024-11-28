import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { IsEmail as IsEmailValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import ValidatorJS from 'validator';

/**
 * Декоратор проверяет, что переданное значение является email
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsEmail = (
  options?: ValidatorJS.IsEmailOptions,
  validationOptions?: ValidationOptions,
) => {
  return IsEmailValidation(options, {
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_EMAIL'),
  });
};
