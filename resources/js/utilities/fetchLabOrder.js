import { labOrderMapper } from "../mappers/labOrders";

export const fetchLabOrder = id => fetch(`/api/lab-orders/${id}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(labOrder => labOrderMapper(labOrder))
