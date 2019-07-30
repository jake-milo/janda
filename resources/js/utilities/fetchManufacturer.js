import { manufacturerMapper } from "../mappers/manufacturers";

export const fetchManufacturer = id => fetch(`/api/manufacturers/${id}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(manufacturer => manufacturerMapper(manufacturer));
