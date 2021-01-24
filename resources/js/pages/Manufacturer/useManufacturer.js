import { toQueryString } from "../../helpers";
import { useApi } from "../../hooks/useApi";
import { manufacturerMapper } from "../../mappers/manufacturers";

export const useManufacturer = (id, { sortBrands, orderBrands }) => useApi(
    `manufacturer`,
    ({ get }) => get(`/api/manufacturers/${id}${toQueryString({
        sortBrands,
        orderBrands,
    })}`),
    manufacturerMapper,
    [id, sortBrands, orderBrands],
);
