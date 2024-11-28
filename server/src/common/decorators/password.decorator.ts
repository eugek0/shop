import { IsStrongPasswordOptions } from 'class-validator/types/decorator/string/IsStrongPassword';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsStrongPassword } from 'class-validator';

/**
 * Декоратор проверяет, что переданное значение удовлетворяет требованиям пароля
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsPassword = (
  options?: IsStrongPasswordOptions,
  validationOptions?: ValidationOptions,
) => {
  return IsStrongPassword(
    {
      ...options,
      minLength: 6,
      minSymbols: 1,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
    },
    {
      ...validationOptions,
      message: i18nValidationMessage('validation.PASSWORD_NOT_ENOUGH'),
    },
  );
};
