import { applyDecorators, Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { DECORATORS } from '@nestjs/swagger/dist/constants';

/**
 * Декоратор используется для документирования запросов в Swagger
 *
 * Принимает:
 *  - Сущность документирования (dto, model).
 *  - Список ключей, которые нужно взять из сущности.
 *
 * Добавляет в документацию:
 *  - К property добавляет сущность в swagger
 */

export const DocsClass = <TModel extends Type>(
  instance: TModel | [TModel],
  ...keys: string[]
) => {
  const metakey = DECORATORS.API_MODEL_PROPERTIES;
  const isArray = Array.isArray(instance);
  const [model] = isArray ? instance : [instance];

  const target = new model();

  const allRawProperties =
    Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES_ARRAY, target) || [];

  const allProperties = allRawProperties.map(processingRawProperty);

  keys = !keys.length ? allProperties : keys;

  const properties = allProperties.reduce((acc, property) => {
    const writeOnly = !keys.includes(property);

    const { type, isArray, ...other } = Reflect.getMetadata(
      metakey,
      target,
      property,
    );

    return {
      ...acc,
      [property]: {
        ...other,
        writeOnly,
        type: getTypeName(type),
      },
    };
  }, {});

  const options = !isArray
    ? { properties }
    : { type: 'array', items: { properties } };

  return applyDecorators(ApiProperty(options));
};

const getTypeName = (type) => {
  switch (type.name) {
    case 'Number':
      return 'number';
    case 'String':
      return 'string';
    case 'type':
      return getTypeName(type());
    default:
      return 'object';
  }
};

const processingRawProperty = (rawProperty) => rawProperty.slice(1);
