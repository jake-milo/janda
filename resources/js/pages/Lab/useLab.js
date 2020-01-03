import { useApi } from '../../hooks/useApi';
import { labMapper } from '../../mappers/labs';

export const useLab = id => useApi(
    'lab',
    ({ get }) => get(`/api/labs/${id}`),
    labMapper,
    [id],
);
