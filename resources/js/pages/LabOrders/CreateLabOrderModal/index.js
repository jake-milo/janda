import React from 'react';
import { Formik } from 'formik';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { PracticePicker } from '../../../components/PracticePicker';
import { LabPicker } from '../../../components/LabPicker';
import { PatientPicker } from '../../../components/PatientPicker';

const getInitialValues = () => ({
    patient_id: '',
    practice_id: '',
    lab_id: '',
    lens: '',
    reference: '',
    date_sent: '',
    date_required: '',
    date_received: '',
});

export const CreateLabOrderModal = ({ show, hide }) => {
    return (
        <Modal show={show} hide={hide}>
            <PageTitle>Create Lab Order</PageTitle>

            <Formik
                initialValues={getInitialValues()}
                render={({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="select-wrapper">
                            <PatientPicker name="patient_id" value={values.patient_id} />
                        </div>

                        <div className="select-wrapper">
                            <PracticePicker onChange={handleChange} value={values.practice_id} />
                        </div>

                        <div className="select-wrapper">
                            <LabPicker onChange={handleChange} value={values.lab_id} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="lens">Lens</label>
                            <input type="text" id="lens" name="lens" onChange={handleChange} value={values.lens} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="reference">Reference</label>
                            <input type="text" id="reference" name="reference" onChange={handleChange} value={values.reference} />
                        </div>
                    </form>
                )}
            />
        </Modal>
    );
};
