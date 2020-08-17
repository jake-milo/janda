import { timeMapper } from './time';
import { labOrdersMapper } from './labOrders';

export const labMapper = ({ time, lab_orders, ...rest }) => {
    const lab = { ...rest };

    lab.time = timeMapper(time);

    if (lab_orders) {
        lab.labOrders = labOrdersMapper(lab_orders);
    }

    return lab;
};

export const labsMapper = labs => labs.map(l => labMapper(l));
