import { useApi } from '../../hooks/useApi';
import { patientsMapper } from '../../mappers/patients';

export const usePatients = () => useApi(
    'patients',
    ({ get, page }) => get(`/api/patients?page=${page}`),
    patientsMapper,
);
