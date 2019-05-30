import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { PracticePicker } from '../../../components/PracticePicker';
import { LabPicker } from '../../../components/LabPicker';
import { PatientPicker } from '../../../components/PatientPicker';
import { DatePicker } from '../../../components/DatePicker';
import { post } from '../../../helpers';

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
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <Modal show={show} hide={hide}>
            <PageTitle>Create Lab Order</PageTitle>

            <Formik
                initialValues={getInitialValues()}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit}>
                        <div className="select-wrapper">
                            <PatientPicker.Formik name="patient_id" value={values.patient_id} />
                        </div>

                        <div className="select-wrapper">
                            <PracticePicker.Formik name="practice_id" value={values.practice_id} />
                        </div>

                        <div className="select-wrapper">
                            <LabPicker.Formik name="lab_id" value={values.lab_id} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="lens">Lens</label>
                            <input type="text" id="lens" name="lens" onChange={handleChange} value={values.lens} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="reference">Reference</label>
                            <input type="text" id="reference" name="reference" onChange={handleChange} value={values.reference} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="date_sent">Date Sent</label>
                            <DatePicker name="date_sent" value={values.date_sent} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="date_required">Date Required</label>
                            <DatePicker
                                name="date_required"
                                value={values.date_required}
                                min={values.date_sent}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="date_received">Date Received</label>
                            <DatePicker
                                name="date_received"
                                value={values.date_received}
                                min={values.date_sent}
                            />
                        </div>

                        <input type="submit" value="Create" />
                    </form>
                )}
            />
        </Modal>
    );
};
