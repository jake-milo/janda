import { useApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useOverdueLabOrders = () => useApi(
    'overdueLabOrders',
    ({ get }) => get('/api/lab-orders?status=overdue&limit=10'),
    labOrdersMapper,
);
