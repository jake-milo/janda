import moment from 'moment';

export const practiceMapper = practices => practices.map(practice => ({
    id: practice.id,
    name: practice.name,
    time: {
        created: moment(practice.time.created),
        updated: moment(practice.time.updated),
    },
}));
