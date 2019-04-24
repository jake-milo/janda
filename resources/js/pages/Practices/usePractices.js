import { useApi } from '../../hooks/useApi';
import { practicesMapper } from '../../mappers/practices';

export const usePractices = () => useApi(
    'practices',
    ({ get, page }) => get(`/api/practices?page=${page}`),
    practicesMapper,
);
