import { useApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';
import { arraysEqual } from '../../helpers';
import { usePrev } from '../../hooks/usePrev';

export const useLabOrders = ({ practice, status, lab }) => {
    const [filters, prevFilters] = usePrev([practice, status, lab]);

    const fetch = ({ get, page, toQueryString, resetPage }) => {
        if (!arraysEqual(filters, prevFilters)) {
            resetPage();
        }

        return get('/api/lab-orders' + toQueryString({
            page,
            practice,
            status,
            lab,
        }));
    }

    return useApi(
        'labOrders',
        fetch,
        labOrdersMapper,
        [practice, status, lab],
    );
}
