import { usePaginatedApi } from '../../hooks/useApi';
import { contactLensesMapper } from '../../mappers/contactLenses';

export const useContactLenses = ({ practice }) => usePaginatedApi(
    'contactLenses',
    ({ get, page }) => get(`/api/contact-lenses?page=${page}&practice=${practice}`),
    contactLensesMapper,
    [practice],
);
