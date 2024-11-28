import { ComponentLoader } from 'adminjs';
import OrderStatuses from '@modules/admin/components/order-statuses.components';

const componentLoader = new ComponentLoader();

const Components = {
  MyImage: componentLoader.add('MyImage', './image.components.tsx'),
  MyPreview: componentLoader.add('MyPreview', './preview.components.tsx'),
  Dashboard: componentLoader.add('Dashboard', './dashboard.components.tsx'),
  MyNavigationImage: componentLoader.add(
    'MyNavigationImage',
    './navigationImage.components.tsx',
  ),
  OrderProducts: componentLoader.add(
    'OrderProducts',
    './order-products.components.tsx',
  ),
  OrderStatuses: componentLoader.add(
    'OrderStatuses',
    './order-statuses.components.tsx',
  ),
};

export { componentLoader, Components };
