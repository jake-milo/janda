import React, { useState } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { PracticePicker } from '../../../components/PracticePicker';
import { LabPicker } from '../../../components/LabPicker';
import { PatientPicker } from '../../../components/PatientPicker';
import { DatePicker } from '../../../components/DatePicker';
import { post, patch } from '../../../helpers';
import { momentSchema, nullableMomentSchema } from '../../../utilities/momentSchema';
import { FieldError } from '../../../components/FieldError';
import { Spinner } from '../../../components/Spinner';
import { useInitialValues } from './useInitialValues';
import { Form } from '../../../components/Form';
import { PickOrNewPatient } from '../../../components/PatientPicker/PickOrNewPatient';

const schema = yup.object().shape({
    patient: yup.mixed().when('$creatingPatient', {
        is: true,
        then: yup.string(),
        otherwise: yup.number().integer().positive(),
    }).required().label('Patient'),
    practice_id: yup.number().integer().positive().required().label('Practice'),
    lab_id: yup.number().integer().positive().required().label('Lab'),
    lens: yup.string().required().label('Lens'),
    reference: yup.string().required().label('Reference'),
    date_sent: momentSchema,
    date_required: momentSchema,
    date_received: nullableMomentSchema,
});

export const CreateLabOrderModal = ({ show, hide, onSuccess, editing }) => {
    const [initialValues, loading] = useInitialValues(editing);
    const [creatingPatient, setCreatingPatient] = useState(false);

    const toStringOrNull = m => moment.isMoment(m) ? m.format('YYYY-MM-DD') : null;

    const handleSubmit = (values, { setSubmitting }) => {
        const { patient, date_sent, date_required, date_received, ...labOrder } = values;

        labOrder.date_sent = toStringOrNull(date_sent);
        labOrder.date_required = toStringOrNull(date_required);
        labOrder.date_received = toStringOrNull(date_received);

        labOrder[creatingPatient ? 'patient' : 'patient_id'] = patient;

        const request = () => editing
            ? patch(`/api/lab-orders/${editing}`, labOrder)
            : post('/api/lab-orders', labOrder);

        request()
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

            {loading && (
                <Spinner />
            )}

            <Form
                validationSchema={schema}
                getContext={() => ({ creatingPatient })}
                initialValues={initialValues}
                enableReinitialize={!!editing}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit} style={{ display: loading ? 'none' : 'block' }}>
                        <PickOrNewPatient.Formik
                            name="patient"
                            value={values.patient}
                            creating={creatingPatient}
                            setCreating={setCreatingPatient}
                        />
                        <FieldError name="patient" />

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

                        <input type="submit" value={editing ? 'Save' : 'Create'} />
                    </form>
                )}
            />
        </Modal>
    );
};
