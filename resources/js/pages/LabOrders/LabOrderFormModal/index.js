import React, { useState, useCallback } from 'react';
import * as yup from 'yup';
import { Modal } from "../../../components/Modal";
import { PageTitle } from "../../../components/PageTitle";
import { PickOrNewPatient } from '../../../components/PatientPicker/PickOrNewPatient';
import { FieldErrorNew } from '../../../components/FieldError';
import { PracticePicker } from '../../../components/PracticePicker';
import { LabPicker } from '../../../components/LabPicker';
import { DatePicker } from '../../../components/DatePicker';
import { momentSchema, nullableMomentSchema } from '../../../utilities/momentSchema';
import { patch, post } from '../../../helpers';
import moment from 'moment';
import { fetchLabOrder } from '../../../utilities/fetchLabOrder';
import { useForm } from '../../../hooks/useForm';
import { FormNew } from '../../../components/Form';

const schema = yup.object().shape({
    patient: yup.string().required().label('Patient'),
    practice_id: yup.string().required().label('Practice'),
    lab_id: yup.string().required().label('Lab'),
    lens: yup.string().required().label('Lens'),
    reference: yup.string().required().label('Order #'),
    date_sent: momentSchema,
    date_required: momentSchema,
    date_received: nullableMomentSchema,
});

export const LabOrderFormModal = ({ show, hide, onSuccess, editing }) => {
    const getInitialValues = useCallback(async (id) => {
        if (!id) return {
            patient: '',
            practice_id: '',
            lab_id: '',
            lens: '',
            reference: '',
            date_sent: moment(),
            date_required: moment().add(7, 'days'),
            date_received: '',
        };

        const labOrder = await fetchLabOrder(id);

        return {
            patient: labOrder.patient.id,
            practice_id: labOrder.practice.id,
            lab_id: labOrder.lab.id,
            lens: labOrder.lens,
            reference: labOrder.reference,
            date_sent: moment(labOrder.dates.sent, 'DD/MM/YY'),
            date_required: moment(labOrder.dates.required, 'DD/MM/YY'),
            date_received: labOrder.dates.received
                ? moment(labOrder.dates.received, 'DD/MM/YY')
                : '',
        };
    }, []);

    const {
        values,
        loading,
        createHandler,
        createNativeHandler,
        errors,
        submitHandler,
        isValid,
    } = useForm({ editing, getInitialValues, schema, showing: show });

    const [creatingPatient, setCreatingPatient] = useState(false);

    const toStringOrNull = m => moment.isMoment(m) ? m.format('YYYY-MM-DD') : null;

    const handleSubmit = submitHandler(() => {
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
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update' : 'Create'} Lab Order</PageTitle>

            <FormNew values={values} loading={loading} onSubmit={handleSubmit} errors={errors}>
                {() => (
                    <>
                        <PickOrNewPatient
                            name="patient"
                            value={values.patient}
                            creating={creatingPatient}
                            setCreating={setCreatingPatient}
                            onChange={createHandler('patient')}
                        />
                        <FieldErrorNew name="patient" />

                        <div className="select-wrapper">
                            <PracticePicker
                                name="practice_id"
                                value={values.practice_id}
                                onChange={createHandler('practice_id')}
                            />
                        </div>
                        <FieldErrorNew name="practice_id" />

                        <div className="select-wrapper">
                            <LabPicker
                                name="lab_id"
                                value={values.lab_id}
                                onChange={createHandler('lab_id')}
                            />
                        </div>
                        <FieldErrorNew name="lab_id" />

                        <div className="input-wrapper">
                            <label htmlFor="lens">Lens</label>
                            <input
                                type="text"
                                id="lens"
                                name="lens"
                                onChange={createNativeHandler('lens')}
                                value={values.lens}
                            />
                        </div>
                        <FieldErrorNew name="lens" />

                        <div className="input-wrapper">
                            <label htmlFor="reference">Order #</label>
                            <input
                                type="text"
                                id="reference"
                                name="reference"
                                onChange={createNativeHandler('reference')}
                                value={values.reference}
                            />
                        </div>
                        <FieldErrorNew name="reference" />

                        <div className="input-wrapper">
                            <label htmlFor="date_sent">Date Sent</label>
                            <DatePicker
                                name="date_sent"
                                value={values.date_sent}
                                onChange={createHandler('date_sent')}
                            />
                        </div>
                        <FieldErrorNew name="date_sent" />

                        <div className="input-wrapper">
                            <label htmlFor="date_required">Date Required</label>
                            <DatePicker
                                name="date_required"
                                value={values.date_required}
                                min={values.date_sent}
                                onChange={createHandler('date_required')}
                            />
                        </div>
                        <FieldErrorNew name="date_required" />

                        <div className="input-wrapper">
                            <label htmlFor="date_received">Date Received</label>
                            <DatePicker
                                name="date_received"
                                value={values.date_received}
                                min={values.date_sent}
                                onChange={createHandler('date_received')}
                            />
                        </div>
                        <FieldErrorNew name="date_received" />

                        <input type="submit" value={editing ? 'Save' : 'Create'} disabled={!isValid} />
                    </>
                )}
            </FormNew>
        </Modal>
    );
};