import { usePaginatedApi } from "../../../hooks/useApi";
import { manufacturersMapper } from "../../../mappers/manufacturers";

export const useManufacturers = () => usePaginatedApi(
    'manufacturers',
    ({ get, page }) => get(`/api/manufacturers?page=${page}`),
    manufacturersMapper,
);
