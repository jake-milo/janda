import { useApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useUrgentLabOrders = () => useApi(
    'urgentLabOrders',
    ({ get }) => get('/api/lab-orders?status=urgent&limit=10'),
    labOrdersMapper,
);
