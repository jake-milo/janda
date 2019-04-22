import { patientMapper } from './patientMapper';
import { useApi } from '../../hooks/useApi';

export const usePatient = id => useApi(
    'patient',
    ({ get }) => get(`/api/patients/${id}`),
    patientMapper,
    [id],
);
