import { ActionRequest, ActionResponse, After, flat } from 'adminjs';

import { MOrder, MOrderProduct } from '@modules/order/models';
import { MProduct } from '@modules/product/models';
import { Sequelize } from 'sequelize';
import { MMotive } from '@modules/motive/models';
import { MVolume } from '@modules/volume/models';
import { MGender } from '@modules/gender/models';

export const getOrderProducts =
  (): After<ActionResponse> =>
  async (
    response: ActionResponse,
    request: ActionRequest,
  ): Promise<ActionResponse> => {
    const orderId = request.params.recordId;

    const products = await MOrderProduct.findAll({
      where: { orderId },
      attributes: [
        'id',
        'price',
        'priceDiscount',
        'priceWithDiscount',
        'count',
      ],
      include: [
        {
          model: MProduct,
          paranoid: false,
          attributes: [
            'id',
            'title',
            [Sequelize.literal(`"product"."images"[1]`), 'preview'],
          ],
          include: [
            {
              model: MMotive,
              paranoid: false,
              attributes: ['id', 'title'],
            },
            {
              model: MVolume,
              paranoid: false,
              attributes: ['id', 'title'],
            },
            {
              model: MGender,
              paranoid: false,
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });

    const params = flat.unflatten(response.record.params);

    params.products = products.map((product) => product.toJSON());

    response.record.params = flat.flatten(params);

    return response;
  };
