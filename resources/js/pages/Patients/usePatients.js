import { usePaginatedApi } from '../../hooks/useApi';
import { patientsMapper } from '../../mappers/patients';
import { toQueryString } from '../../helpers';

export const usePatients = ({ sort, order }) => usePaginatedApi(
    'patients',
    ({ get, page }) => {
        const url = `/api/patients` + toQueryString({
            page,
            sort,
            order,
        })
        return get(url);
    },
    patientsMapper,
    [sort, order],
);
