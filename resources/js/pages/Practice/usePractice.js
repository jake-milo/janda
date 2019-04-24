import { useApi } from '../../hooks/useApi';
import { practiceMapper } from '../../mappers/practices';

export const usePractice = id => useApi(
    'practice',
    ({ get }) => get(`/api/practices/${id}`),
    practiceMapper,
    [id],
);
