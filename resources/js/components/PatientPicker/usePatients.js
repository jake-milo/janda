import { useApi } from "../../hooks/useApi";
import { patientsMapper } from "../../mappers/patients";

export const usePatients = ({ filter, include }) => useApi(
    'patients',
    ({ get, toQueryString }) => {
        return get('/api/patients' + toQueryString({ filter, include }));
    },
    patientsMapper,
    [filter, include],
);
