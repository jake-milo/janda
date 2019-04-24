import { timeMapper } from './time';
import { labMapper } from './labs';
import { practiceMapper } from './practices';
import { patientMapper } from './patients';

export const labOrderMapper = ({ practice, lab, patient, time, ...rest }) => {
    const labOrder = { ...rest };

    labOrder.time = timeMapper(time);

    if (practice) {
        labOrder.practice = practiceMapper(practice);
    }

    if (lab) {
        labOrder.lab = labMapper(lab);
    }

    if (patient) {
        labOrder.patient = patientMapper(patient);
    }

    return labOrder;
};

export const labOrdersMapper = labOrders => labOrders.map(l => labOrderMapper(l));
