import { useApi } from "../../hooks/useApi";
import { manufacturersMapper } from "../../mappers/manufacturers";

export const useManufacturers = ({ filter }) => useApi(
    'manufacturers',
    ({ get, toQueryString }) => get('/api/manufacturers' + toQueryString({ filter })),
    manufacturersMapper,
    [filter],
);
