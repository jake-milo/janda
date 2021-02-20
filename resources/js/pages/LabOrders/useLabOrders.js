import { useEffect } from 'react';
import { usePaginatedApi } from '../../hooks/useApi';
import { labOrdersMapper } from '../../mappers/labOrders';

export const useLabOrders = ({ practice, status, lab, sort, order, filter, patient }) => {
    const fetch = ({ get, page, toQueryString }) => {
        const url = `/api/lab-orders` + toQueryString({
            page,
            practice,
            status,
            lab,
            sort,
            order,
            filter,
            patient,
        });

        return get(url);
    };

    const api = usePaginatedApi(
        'labOrders',
        fetch,
        labOrdersMapper,
        [practice, status, lab, sort, order, filter, patient],
    );

    useEffect(() => {
        api.resetPage();
    }, [practice, status, lab, sort, order, filter, patient]);

    return api;
}
