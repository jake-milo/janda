import { timeMapper } from "./time";
import { labOrdersMapper } from "./labOrders";
import { contactLensesMapper } from "./contactLenses";
import { practiceMapper } from "./practices";

export const patientMapper = ({
    time,
    lab_orders,
    contact_lenses,
    practice,
    ...rest
}) => {
    const patient = { ...rest };

    patient.time = timeMapper(time);

    if (lab_orders) {
        patient.labOrders = labOrdersMapper(lab_orders);
    }

    if (contact_lenses) {
        patient.contactLenses = contactLensesMapper(contact_lenses);
    }

    if (practice) {
        patient.practice = practiceMapper(practice);
    }

    return patient;
};

export const patientsMapper = patients => patients.map(p => patientMapper(p));
