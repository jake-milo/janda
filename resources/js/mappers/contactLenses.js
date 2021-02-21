import { timeMapper } from './time';
import { practiceMapper } from './practices';
import { patientMapper } from './patients';

const formatMoney = value => `£${(value / 100).toFixed(2)}`;

export const contactLensLeftRightMapper = ({ price, ...rest }) => {
    const side = { ...rest };

    side.raw_price = price;
    if (price) {
        side.price = formatMoney(parseInt(price, 10));
    }

    return side;
};

export const contactLensMapper = ({
    practice,
    patient,
    left,
    right,
    time,
    ...rest
}) => {
    const contactLens = { ...rest };

    contactLens.time = timeMapper(time);

    if (practice) {
        contactLens.practice = practiceMapper(practice);
    }

    if (patient) {
        contactLens.patient = patientMapper(patient);
    }

    if (left) {
        contactLens.left = contactLensLeftRightMapper(left);
    }

    if (right) {
        contactLens.right = contactLensLeftRightMapper(right);
    }

    return contactLens;
};

export const contactLensesMapper = contactLenses => contactLenses.map(c => contactLensMapper(c));
