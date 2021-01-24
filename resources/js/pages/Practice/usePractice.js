import { toQueryString } from '../../helpers';
import { useApi } from '../../hooks/useApi';
import { practiceMapper } from '../../mappers/practices';

export const usePractice = (id, {
    sortLabOrders,
    orderLabOrders,
    sortContactLenses,
    orderContactLenses,
}) => useApi(
    'practice',
    ({ get }) => get(`/api/practices/${id}${toQueryString({
        sortLabOrders,
        orderLabOrders,
        sortContactLenses,
        orderContactLenses,
    })}`),
    practiceMapper,
    [id, sortLabOrders, orderLabOrders, sortContactLenses, orderContactLenses],
);
