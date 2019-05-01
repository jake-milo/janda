import { useApi } from '../../hooks/useApi';
import { labsMapper } from '../../mappers/labs';

export const useLabs = id => useApi(
    'labs',
    ({ get, page }) => get(`/api/labs?page=${page}`),
    labsMapper,
);
