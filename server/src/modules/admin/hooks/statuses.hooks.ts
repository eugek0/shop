import { ActionRequest, ActionResponse, After, flat } from 'adminjs';

import { MOrderHistoryStatus, MOrderStatus } from '@modules/order/models';

export const getOrderStatuses =
  (): After<ActionResponse> =>
  async (
    response: ActionResponse,
    request: ActionRequest,
  ): Promise<ActionResponse> => {
    // if (!isGETMethod(request)) {
    //   return response;
    // }

    const orderId = request.params.recordId;

    const statuses = await MOrderHistoryStatus.findAll({
      where: { orderId },
      paranoid: false,
      attributes: ['id', 'createdAt'],
      include: [
        {
          model: MOrderStatus,
          paranoid: false,
          attributes: ['id', 'title'],
        },
      ],
    });

    const params = flat.unflatten(response.record.params);

    params.statuses = statuses.map((status) => status.toJSON());

    response.record.params = flat.flatten(params);

    return response;
  };
