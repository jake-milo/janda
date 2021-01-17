import { useApi } from '../../hooks/useApi';
import { contactLensBrandsMapper } from '../../mappers/contactLensBrands';

export const useTypes = ({brandId }) => useApi(
    'types',
    ({ get }) => brandId
        ? get(`/api/contact-lens-brands/${brandId}/types`)
        : null,
    contactLensBrandsMapper,
    [brandId],
);
