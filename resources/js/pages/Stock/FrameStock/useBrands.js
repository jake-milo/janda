import { useApi } from '../../../hooks/useApi';
import { brandsMapper } from '../../../mappers/brands';

export const useBrands = () => useApi(
    'groupedBrands',
    ({ get }) => get(`/api/brands`),
    brandsMapper,
);
