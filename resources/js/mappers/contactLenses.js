import { timeMapper } from './time';
import { practiceMapper } from './practices';
import { patientMapper } from './patients';
import { contactLensBrandMapper } from './contactLensBrands';

const formatMoney = value => `£${(value / 100).toFixed(2)}`;

export const contactLensMapper = ({
    practice,
    patient,
    brand,
    time,
    price,
    shipping_cost,
    ...rest,
}) => {
    const contactLens = { ...rest };

    contactLens.time = timeMapper(time);

    contactLens.price = formatMoney(parseInt(price, 10));
    contactLens.raw_price = price;

    if (practice) {
        contactLens.practice = practiceMapper(practice);
    }

    if (patient) {
        contactLens.patient = patientMapper(patient);
    }

    if (brand) {
        contactLens.brand = contactLensBrandMapper(brand);
    }

    return contactLens;
};

export const contactLensesMapper = contactLenses => contactLenses.map(c => contactLensMapper(c));
