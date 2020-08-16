import { usePaginatedApi } from '../../hooks/useApi';
import { patientsMapper } from '../../mappers/patients';
import { toQueryString } from '../../helpers';

export const usePatients = ({ sort, order, filter }) => usePaginatedApi(
    'patients',
    ({ get, page }) => {
        const params = { page, sort, order };
        if (filter) {
            params.filter = filter;
        }

        const url = `/api/patients` + toQueryString(params);

        return get(url);
    },
    patientsMapper,
    [sort, order, filter],
);
