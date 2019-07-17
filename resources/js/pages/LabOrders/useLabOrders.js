import { useEffect } from 'react';
import { usePaginatedApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useLabOrders = ({ practice, status, lab }) => {
    const fetch = ({ get, page, toQueryString }) => {
        const url = `api/lab-orders` + toQueryString({
            page,
            practice,
            status,
            lab,
        });

        return get(url);
    };

    const api = usePaginatedApi(
        'labOrders',
        fetch,
        labOrdersMapper,
        [practice, status, lab],
    );

    useEffect(() => {
        api.resetPage();
    }, [practice, status, lab]);

    return api;
}
