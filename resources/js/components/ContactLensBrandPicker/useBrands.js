import { useApi } from '../../hooks/useApi';
import { contactLensBrandsMapper } from '../../mappers/contactLensBrands';

export const useBrands = ({ filter, include }) => useApi(
    'brands',
    ({ get, toQueryString }) => get('/api/contact-lens-brands' + toQueryString({ filter, include })),
    contactLensBrandsMapper,
    [filter],
);
