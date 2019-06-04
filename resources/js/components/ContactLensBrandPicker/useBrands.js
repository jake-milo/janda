import { useApi } from '../../hooks/useApi';
import { contactLensBrandsMapper } from '../../mappers/contactLensBrands';

export const useBrands = ({ filter }) => useApi(
    'brands',
    ({ get, toQueryString }) => get('/api/contact-lens-brands' + toQueryString({ filter })),
    contactLensBrandsMapper,
    [filter],
);
