import moment from 'moment';

export const timeMapper = ({ created, updated }) => ({
    created: moment(created),
    updated: moment(updated),
});
