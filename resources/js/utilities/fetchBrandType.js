import { brandTypeMapper } from "../mappers/brandTypes";

export const fetchBrandType = (brandId, typeId) => fetch(`/api/brands/${brandId}/types/${typeId}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(type => brandTypeMapper(type))
