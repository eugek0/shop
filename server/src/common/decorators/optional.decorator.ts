import {
  IsOptional as IsOptionalValidate,
  ValidateIf,
  ValidationOptions,
} from 'class-validator';

interface IValidationOptions extends ValidationOptions {
  isNull?: boolean;
}

const defaultOptions: IValidationOptions = { isNull: true };

export const IsOptional = ({
  isNull,
  ...validationOptions
} = defaultOptions) => {
  if (isNull) return IsOptionalValidate(validationOptions);

  return ValidateIf((o, value) => value !== undefined, validationOptions);
};
