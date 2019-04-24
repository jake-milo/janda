import { useApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useLabOrders = () => useApi(
    'labOrders',
    ({ get, page }) => get(`/api/lab-orders?page=${page}`),
    labOrdersMapper,
);
