import { useApi } from '../../../hooks/useApi';
import { brandsMapper } from '../../../mappers/brands';

export const useContactLensBrands = () =>
    useApi(
        'groupedBrands',
        ({ get }) => get('/api/contact-lens-brands'),
        brandsMapper,
    );
