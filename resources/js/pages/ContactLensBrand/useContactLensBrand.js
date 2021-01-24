import { toQueryString } from "../../helpers";
import { useApi } from "../../hooks/useApi";
import { brandMapper } from "../../mappers/brands";

export const useContactLensBrand = (id, { sortTypes, orderTypes }) => useApi(
    'brand',
    ({ get }) => get(`/api/contact-lens-brands/${id}${toQueryString({ sortTypes, orderTypes })}`),
    brandMapper,
    [id, sortTypes, orderTypes],
);
