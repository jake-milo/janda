import { useApi } from "../../hooks/useApi";
import { brandMapper } from "../../mappers/brands";

export const useBrand = (id) => useApi(
    'brand',
    ({ get }) => get(`/api/brands/${id}`),
    brandMapper,
    [id],
);
