import { useApi } from '../../hooks/useApi';
import { practiceMapper } from './practiceMapper';

export const usePractice = id => useApi(
    'practice',
    ({ get }) => get(`/api/practices/${id}`),
    practiceMapper,
    [id],
);
