import { useApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useLabOrders = ({ practice }) => useApi(
    'labOrders',
    ({ get, page }) => get(`/api/lab-orders?page=${page}&practice=${practice}`),
    labOrdersMapper,
    [practice],
);
