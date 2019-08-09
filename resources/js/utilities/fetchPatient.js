import { patientMapper } from "../mappers/patients";

export const fetchPatient = id => fetch(`/api/patients/${id}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(patient => patientMapper(patient));
