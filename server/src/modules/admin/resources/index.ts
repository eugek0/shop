import importExportFeature from '@adminjs/import-export';
import loggerFeature from '@adminjs/logger';

import { NavigationResource } from '@modules/admin/resources/navigation.resource';
import { EmployeeResource } from '@modules/admin/resources/employee.resourse';
import { PositionResource } from '@modules/admin/resources/position.resource';
import { DiscountResource } from '@modules/admin/resources/discount.resource';
import { ProductResource } from '@modules/admin/resources/product.resource';
import { GenderResource } from '@modules/admin/resources/gender.resource';
import { MotiveResource } from '@modules/admin/resources/motive.resource';
import { VolumeResource } from '@modules/admin/resources/volume.resource';
import { ColorResource } from '@modules/admin/resources/color.resource';
import { UserResource } from '@modules/admin/resources/user.resource';
import { TypeResource } from '@modules/admin/resources/type.resource';
import { FileResource } from '@modules/admin/resources/file.resource';
import {
  featureOptions,
  LogResource,
} from '@modules/admin/resources/log.resource';
import { OrderResource } from '@modules/admin/resources/order.resource';
import { RecipientResource } from '@modules/admin/resources/recipient.resource';
import { OrderStatusResource } from '@modules/admin/resources/order-status.resource';
import { DeliveryResource } from '@modules/admin/resources/delivery.resource';
import { PaymentResource } from '@modules/admin/resources/payment.resource';

const rawResource = [
  NavigationResource,
  OrderResource,
  RecipientResource,
  OrderStatusResource,
  DeliveryResource,
  PaymentResource,
  EmployeeResource,
  PositionResource,
  DiscountResource,
  UserResource,
  ProductResource,
  TypeResource,
  ColorResource,
  VolumeResource,
  GenderResource,
  MotiveResource,
  FileResource,
  LogResource,
];

const addImportAndExportInResources = rawResource.map((resource) => ({
  ...resource,
  features: [
    ...(resource['features'] || []),
    importExportFeature(),
    loggerFeature(featureOptions),
  ],
}));

export const resources = addImportAndExportInResources;
