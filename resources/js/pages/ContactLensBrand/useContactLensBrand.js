import { useApi } from "../../hooks/useApi";
import { brandMapper } from "../../mappers/brands";

export const useContactLensBrand = (id) => useApi(
    'brand',
    ({ get }) => get(`/api/contact-lens-brands/${id}`),
    brandMapper,
    [id],
);
