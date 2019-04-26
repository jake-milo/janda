import { useApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useLabOrders = ({ practice, status }) => useApi(
    'labOrders',
    ({ get, page, toQueryString }) => get('/api/lab-orders' + toQueryString({
        page,
        practice,
        status,
    })),
    labOrdersMapper,
    [practice, status],
);
