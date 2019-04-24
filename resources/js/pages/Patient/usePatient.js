import { useApi } from '../../hooks/useApi';
import { patientMapper } from '../../mappers/patients';

export const usePatient = id => useApi(
    'patient',
    ({ get }) => get(`/api/patients/${id}`),
    patientMapper,
    [id],
);
