import { usePaginatedApi } from "../../../hooks/useApi";
import { manufacturersMapper } from "../../../mappers/manufacturers";
import { toQueryString } from "../../../helpers";

export const useManufacturers = ({ sort, order }) => usePaginatedApi(
    'manufacturers',
    ({ get, page }) => {
        const url = `/api/manufacturers` + toQueryString({
            page,
            sort,
            order
        })
        return get(url);
    },
    manufacturersMapper,
    [sort,order],
);
