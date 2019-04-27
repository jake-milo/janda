import { practicesMapper } from "../../../mappers/practices";
import { useApi } from "../../../hooks/useApi";

export const usePractices = () => useApi(
    'practices',
    ({ get }) => get('/api/practices'),
    practicesMapper,
);
