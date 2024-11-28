import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { IsBoolean as IsBooleanValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Декоратор проверяет, что переданное значение является булевым
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsBoolean = (validationOptions?: ValidationOptions) => {
  return IsBooleanValidation({
    ...validationOptions,
    message: i18nValidationMessage('validation.INVALID_BOOLEAN'),
  });
};
