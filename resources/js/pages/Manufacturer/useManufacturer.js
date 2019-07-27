import { useApi } from "../../hooks/useApi";
import { manufacturerMapper } from "../../mappers/manufacturers";

export const useManufacturer = id => useApi(
    `manufacturer`,
    ({ get }) => get(`/api/manufacturers/${id}`),
    manufacturerMapper,
    [id],
);
