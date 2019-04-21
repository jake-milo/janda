import moment from 'moment';

const timeMapper = ({ created, updated }) => ({
    created: moment(created),
    updated: moment(updated),
});

const labOrdersMapper = labOrders => labOrders.map(({ time, ...labOrder }) => ({
    ...labOrder,
    time: timeMapper(time),
}));

const contactLensMapper = contactLenses => contactLenses.map(({ time, ...contactLens }) => ({
    ...contactLens,
    time: timeMapper(time),
}));

export const patientMapper = ({ time, contact_lenses, lab_orders, ...patient }) => ({
    ...patient,
    labOrders: labOrdersMapper(lab_orders),
    contactLenses: contactLensMapper(contact_lenses),
    time: timeMapper(time),
});
