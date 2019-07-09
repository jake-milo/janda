import { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchLabOrder } from '../../../utilities/fetchLabOrder';

const getInitialValues = () => ({
    patient_id: '',
    practice_id: '',
    lab_id: '',
    lens: '123',
    reference: 'ABC',
    date_sent: moment(),
    date_required: moment().add(7, 'days'),
    date_received: '',
});

export const useInitialValues = (id) => {
    const isEditing = !!id;
    const [initialValues, setInitialValues] = useState(isEditing ? null : getInitialValues());
    const [loading, setLoading] = useState(isEditing);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetchLabOrder(id)
            .then((labOrder) => {
                setInitialValues({
                    patient_id: labOrder.patient.id,
                    practice_id: labOrder.practice.id,
                    lab_id: labOrder.lab.id,
                    lens: labOrder.lens,
                    reference: labOrder.reference,
                    date_sent: moment(labOrder.dates.sent, 'DD/MM/YY'),
                    date_required: moment(labOrder.dates.required, 'DD/MM/YY'),
                    date_received: labOrder.dates.received
                        ? moment(labOrder.dates.received, 'DD/MM/YY')
                        : '',
                });
                setLoading(false);
            })
    }, [id]);

    return [initialValues, loading];
};
