import { usePaginatedApi } from '../../hooks/useApi';
import { labsMapper } from '../../mappers/labs';
import { toQueryString } from '../../helpers';

export const useLabs = ({ sort, order }) => usePaginatedApi(
    'labs',
    ({ get, page }) => {
        const url = `/api/labs` + toQueryString({
            page,
            sort,
            order,
        })
        return get(url);
    },
    labsMapper,
    [sort, order],
);
