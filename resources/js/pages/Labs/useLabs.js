import { usePaginatedApi } from '../../hooks/useApi';
import { labsMapper } from '../../mappers/labs';

export const useLabs = () => usePaginatedApi(
    'labs',
    ({ get, page }) => get(`/api/labs?page=${page}`),
    labsMapper,
);
