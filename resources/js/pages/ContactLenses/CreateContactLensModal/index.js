import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { PracticePicker } from '../../../components/PracticePicker';
import { PatientPicker } from '../../../components/PatientPicker';
import { post } from '../../../helpers';
import { FieldError } from '../../../components/FieldError';
import { ContactLensBrandPicker } from '../../../components/ContactLensBrandPicker';

const getInitialValues = () => ({
    patient_id: '',
    practice_id: '',
    brand_id: '',
});

const schema = yup.object().shape({
    patient_id: yup.number().integer().positive().required().label('Patient'),
    practice_id: yup.number().integer().positive().required().label('Practice'),
    brand_id: yup.number().integer().positive().required().label('Brand'),
});

export const CreateContactLensModal = ({ show, hide, onSuccess }) => {
    const handleSubmit = (values, { setSubmitting }) => {
        post('/api/lab-orders', values)
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
            <PageTitle>Create Contact Lens</PageTitle>

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
                            <ContactLensBrandPicker.Formik name="brand_id" value={values.brand_id} />
                        </div>
                        <FieldError name="brand_id" />

                        <input type="submit" value="Create" />
                    </form>
                )}
            />
        </Modal>
    );
};
