import { labMapper } from "../mappers/labs";

export const fetchLab = id => fetch(`/api/labs/${id}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(lab => labMapper(lab));
