import { practiceMapper } from './practiceMapper';
import { useApi } from '../../hooks/useApi';

export const usePractices = () => useApi(
    'practices',
    ({ get, page }) => get(`/api/practices?page=${page}`),
    practiceMapper,
);
