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
import { ContactLensTypePicker } from '../../../components/ContactLensTypePicker';
import { MoneyInput } from '../../../components/MoneyInput';

const getInitialValues = () => ({
    patient_id: '',
    practice_id: '',
    brand_id: '',
    type_id: '',
    lens: '',
    left: '',
    right: '',
    cost: '',
});

const schema = yup.object().shape({
    patient_id: yup.number().integer().positive().required().label('Patient'),
    practice_id: yup.number().integer().positive().required().label('Practice'),
    brand_id: yup.number().integer().positive().required().label('Brand'),
    type_id: yup.number().integer().positive().required().label('Model'),
    lens: yup.string().required().label('Lens'),
    left: yup.string().required().label('Left'),
    right: yup.string().required().label('Right'),
});

export const CreateContactLensModal = ({ show, hide, onSuccess }) => {
    const handleSubmit = (values, { setSubmitting }) => {
        post('/api/contact-lenses', values)
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
                render={({ handleSubmit: onSubmit, handleChange, values }) => (console.log(values),
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

                        <div className="select-wrapper">
                            <ContactLensTypePicker.Formik name="type_id" value={values.type_id} brandId={values.brand_id} />
                        </div>
                        <FieldError name="type_id" />

                        <div className="input-wrapper">
                            <label htmlFor="lens">Lens</label>
                            <input type="text" id="lens" name="lens" onChange={handleChange} value={values.lens} />
                        </div>
                        <FieldError name="lens" />

                        <div className="input-wrapper">
                            <label htmlFor="lens">Left</label>
                            <input type="text" id="left" name="left" onChange={handleChange} value={values.left} />
                        </div>
                        <FieldError name="left" />

                        <div className="input-wrapper">
                            <label htmlFor="lens">Right</label>
                            <input type="text" id="right" name="right" onChange={handleChange} value={values.right} />
                        </div>
                        <FieldError name="right" />

                        <div className="input-wrapper">
                            <label htmlFor="cost">Cost</label>
                            <MoneyInput.Formik value={values.cost} name="cost" />
                        </div>

                        <input type="submit" value="Create" />
                    </form>
                )}
            />
        </Modal>
    );
};
