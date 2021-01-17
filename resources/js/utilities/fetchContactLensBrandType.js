import { brandTypeMapper } from "../mappers/brandTypes";

export const fetchContactLensBrandType = (brandId, typeId) => fetch(`/api/contact-lens-brands/${brandId}/types/${typeId}`)
    .then(res => res.json())
    .then(data => data.data)
    // .then(type => brandTypeMapper(type))
