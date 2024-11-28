import { MPriceHistory, MProduct } from '@modules/product/models';
import { MNavigation } from '@modules/navigation/models';
import { MFavorite } from '@modules/favorite/models';
import { MDiscount } from '@modules/discount/models';
import { MMotive } from '@modules/motive/models';
import { MReport } from '@modules/report/models';
import { MGender } from '@modules/gender/models';
import { MVolume } from '@modules/volume/models';
import { MColor } from '@modules/color/models';
import { MType } from '@modules/type/models';
import { MCart } from '@modules/cart/models';
import { MSeance } from './seance/models';
import { MUser } from './user/models';
import {
  MOrderHistoryStatus,
  MOrderProduct,
  MOrderStatus,
  MRecipient,
  MDelivery,
  MPayment,
  MOrder,
} from '@modules/order/models';

export const models = [
  MOrderHistoryStatus,
  MPriceHistory,
  MOrderProduct,
  MOrderStatus,
  MNavigation,
  MRecipient,
  MFavorite,
  MDiscount,
  MDelivery,
  MProduct,
  MPayment,
  MSeance,
  MGender,
  MVolume,
  MReport,
  MMotive,
  MOrder,
  MColor,
  MUser,
  MType,
  MCart,
];
