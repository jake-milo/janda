import { usePaginatedApi } from '../../hooks/useApi';
import { practicesMapper } from '../../mappers/practices';

export const usePractices = () => usePaginatedApi(
    'practices',
    ({ get, page }) => get(`/api/practices?page=${page}`),
    practicesMapper,
);
