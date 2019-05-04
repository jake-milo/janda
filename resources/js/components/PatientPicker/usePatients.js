import { useApi } from "../../hooks/useApi";
import { patientsMapper } from "../../mappers/patients";

export const usePatients = ({ filter }) => useApi(
    'patients',
    ({ get, toQueryString }) => get('/api/patients' + toQueryString({
        filter,
    })),
    patientsMapper,
    [filter],
);
