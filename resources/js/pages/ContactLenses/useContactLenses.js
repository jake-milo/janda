import { useApi } from '../../hooks/useApi';
import { contactLensesMapper } from '../../mappers/contactLenses';

export const useContactLenses = ({ practice }) => useApi(
    'contactLenses',
    ({ get, page }) => get(`/api/contact-lenses?page=${page}&practice=${practice}`),
    contactLensesMapper,
    [practice],
);
