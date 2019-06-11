import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { PracticePicker } from '../../../components/PracticePicker';
import { LabPicker } from '../../../components/LabPicker';
import { PatientPicker } from '../../../components/PatientPicker';
import { DatePicker } from '../../../components/DatePicker';
import { post } from '../../../helpers';
import { momentSchema, nullableMomentSchema } from '../../../utilities/momentSchema';
import { FieldError } from '../../../components/FieldError';

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

const schema = yup.object().shape({
    patient_id: yup.number().integer().positive().required().label('Patient'),
    practice_id: yup.number().integer().positive().required().label('Practice'),
    lab_id: yup.number().integer().positive().required().label('Lab'),
    lens: yup.string().required().label('Lens'),
    reference: yup.string().required().label('Reference'),
    date_sent: momentSchema,
    date_required: momentSchema,
    date_received: nullableMomentSchema,
});

export const CreateLabOrderModal = ({ show, hide, onSuccess }) => {
    const toStringOrNull = m => moment.isMoment(m) ? m.format('YYYY-MM-DD') : null;

    const handleSubmit = (values, { setSubmitting }) => {
        const { date_sent, date_required, date_received, ...labOrder } = values;

        labOrder.date_sent = toStringOrNull(date_sent);
        labOrder.date_required = toStringOrNull(date_required);
        labOrder.date_received = toStringOrNull(date_received);

        post('/api/lab-orders', labOrder)
            .then(() => {
                hide();
                onSuccess();
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err);
                setSubmitting(false);
            });
    };


    return (
        <Modal show={show} hide={hide}>
            <PageTitle>Create Lab Order</PageTitle>

            <Formik
                validationSchema={schema}
                initialValues={getInitialValues()}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit}>
                        <div className="select-wrapper">
                            <PatientPicker.Formik name="patient_id" value={values.patient_id} />
                        </div>
                        <FieldError name="patient_id" />

                        <div className="select-wrapper">
                            <PracticePicker.Formik name="practice_id" value={values.practice_id} />
                        </div>
                        <FieldError name="practice_id" />

                        <div className="select-wrapper">
                            <LabPicker.Formik name="lab_id" value={values.lab_id} />
                        </div>
                        <FieldError name="lab_id" />

                        <div className="input-wrapper">
                            <label htmlFor="lens">Lens</label>
                            <input type="text" id="lens" name="lens" onChange={handleChange} value={values.lens} />
                        </div>
                        <FieldError name="lens" />

                        <div className="input-wrapper">
                            <label htmlFor="reference">Reference</label>
                            <input type="text" id="reference" name="reference" onChange={handleChange} value={values.reference} />
                        </div>
                        <FieldError name="reference" />

                        <div className="input-wrapper">
                            <label htmlFor="date_sent">Date Sent</label>
                            <DatePicker name="date_sent" value={values.date_sent} />
                        </div>
                        <FieldError name="date_sent" />

                        <div className="input-wrapper">
                            <label htmlFor="date_required">Date Required</label>
                            <DatePicker
                                name="date_required"
                                value={values.date_required}
                                min={values.date_sent}
                            />
                        </div>
                        <FieldError name="date_required" />

                        <div className="input-wrapper">
                            <label htmlFor="date_received">Date Received</label>
                            <DatePicker
                                name="date_received"
                                value={values.date_received}
                                min={values.date_sent}
                            />
                        </div>
                        <FieldError name="date_received" />

                        <input type="submit" value="Create" />
                    </form>
                )}
            />
        </Modal>
    );
};
