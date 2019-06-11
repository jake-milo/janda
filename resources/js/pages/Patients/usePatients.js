import { usePaginatedApi } from '../../hooks/useApi';
import { patientsMapper } from '../../mappers/patients';

export const usePatients = () => usePaginatedApi(
    'patients',
    ({ get, page }) => get(`/api/patients?page=${page}`),
    patientsMapper,
);
