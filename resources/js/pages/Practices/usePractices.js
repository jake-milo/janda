import { usePaginatedApi } from '../../hooks/useApi';
import { practicesMapper } from '../../mappers/practices';
import { toQueryString } from '../../helpers';

export const usePractices = ({ sort, order }) => usePaginatedApi(
    'practices',
    ({ get, page }) => {
        const url = `/api/practices` + toQueryString({
            page,
            sort,
            order,
        })
        return get(url);
    },
    practicesMapper,
    [sort, order],
);
