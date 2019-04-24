import { timeMapper } from './time';
import { practiceMapper } from './practices';
import { patientMapper } from './patients';

const formatMoney = value => `£${(value / 100).toFixed(2)}`;

export const contactLensMapper = ({
    practice,
    patient,
    time,
    price: priceRaw,
    shipping_cost,
    ...rest,
}) => {
    const contactLens = { ...rest };

    contactLens.time = timeMapper(time);

    const price = parseInt(priceRaw, 10);
    const shippingCost = parseInt(shipping_cost, 10);
    contactLens.cost = formatMoney(price + shippingCost);
    contactLens.costExclPostage = formatMoney(price);

    if (practice) {
        contactLens.practice = practiceMapper(practice);
    }

    if (patient) {
        contactLens.patient = patientMapper(patient);
    }

    return contactLens;
};

export const contactLensesMapper = contactLenses => contactLenses.map(c => contactLensMapper(c));
