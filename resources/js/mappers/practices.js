import { timeMapper } from './time';
import { labOrdersMapper } from './labOrders';
import { contactLensesMapper } from './contactLenses';

export const practiceMapper = ({ time, lab_orders, contact_lenses, ...rest }) => {
    const practice = { ...rest };

    practice.time = timeMapper(time);

    if (lab_orders) {
        practice.labOrders = labOrdersMapper(lab_orders);
    }

    if (contact_lenses) {
        practice.contactLenses = contactLensesMapper(contact_lenses);
    }

    return practice;
};

export const practicesMapper = practices => practices.map(p => practiceMapper(p));
