import { patientMapper } from './patientMapper';
import { useApi } from '../../hooks/useApi';

export const usePatients = () => useApi(
    'patients',
    ({ get, page }) => get(`/api/patients?page=${page}`),
    patientMapper,
);
