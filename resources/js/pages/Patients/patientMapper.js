import moment from 'moment';

export const patientMapper = patients => patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    time: {
        created: moment(patient.time.created),
        updated: moment(patient.time.updated),
    },
}));
