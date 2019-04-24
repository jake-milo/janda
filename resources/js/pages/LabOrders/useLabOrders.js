import { useApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useLabOrders = ({ practice }) => useApi(
    'labOrders',
    ({ get, page }) => {
        console.log(practice);
        return get(`/api/lab-orders?page=${page}&practice=${practice}`)
    },
    labOrdersMapper,
    [practice],
);
