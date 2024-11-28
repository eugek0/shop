import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { UUIDVersion } from 'class-validator/types/decorator/string/IsUUID';
import { IsUUID as IsUUIDValidation } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Декоратор проверяет, что переданное значение является уникальным id
 * и устанавливает локализированное сообшение об ошибке
 *
 * Добавляет в опции:
 *  - ключ для локализации сообщения об ошибке
 */

export const IsUUID = (
  version?: UUIDVersion,
  validationOptions?: ValidationOptions,
) => {
  return IsUUIDValidation(version, {
    ...validationOptions,
    message: i18nValidationMessage('validation.NOT_UUID'),
  });
};
