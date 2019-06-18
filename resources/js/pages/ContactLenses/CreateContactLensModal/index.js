import React, { useState } from 'react';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { PracticePicker } from '../../../components/PracticePicker';
import { post } from '../../../helpers';
import { FieldError } from '../../../components/FieldError';
import { MoneyInput } from '../../../components/MoneyInput';
import { PickOrNewPatient } from '../../../components/PatientPicker/PickOrNewPatient';
import { Form } from '../../../components/Form';
import { PickOrNewContactLensBrandType } from '../../../components/PickOrNewContactLensBrandType';

const getInitialValues = () => ({
    patient: '',
    practice_id: '',
    brand: '',
    type: '',
    duration: '',
    left: '',
    right: '',
    quantity: '',
    price: '',
    solutions: '',
});

const schema = yup.object().shape({
    patient: yup.mixed().when('$creatingPatient', {
        is: true,
        then: yup.string(),
        otherwise: yup.number().integer().positive(),
    }).required().label('Patient'),
    practice_id: yup.number().integer().positive().required().label('Practice'),
    brand: yup.mixed().when('$creatingBrand', {
        is: true,
        then: yup.string(),
        otherwise: yup.number().integer().positive(),
    }).required().label('Brand'),
    brand: yup.string().label('Brand'),
    type: yup.mixed().when('$creatingType', {
        is: true,
        then: yup.string(),
        otherwise: yup.number().integer().positive(),
    }).required().label('Model'),
    duration: yup.mixed().when('$creatingType', {
        is: true,
        then: yup.string().required(),
        otherwise: yup.mixed().notRequired(),
    }),
    left: yup.string().required().label('Left'),
    right: yup.string().required().label('Right'),
    quantity: yup.string().required().label('Quantity'),
    price: yup.number().integer().positive().required().label('Cost'),
    solutions: yup.string().label('Solutions'),
});

export const CreateContactLensModal = ({ show, hide, onSuccess }) => {
    const [creatingPatient, setCreatingPatient] = useState(false);
    const [creatingBrand, setCreatingBrand] = useState(false);
    const [creatingType, setCreatingType] = useState(false);

    const handleSubmit = (values, { setSubmitting }) => {
        const { patient, brand, type, duration, ...contactLens } = values;

        contactLens[creatingPatient ? 'patient' : 'patient_id'] = patient;

        if (creatingBrand) {
            contactLens.brand = brand;
        } else if (creatingType) {
            contactLens.brand_id = brand;
        }

        if (creatingType) {
            contactLens.type = type;
            contactLens.duration = duration;
        } else {
            contactLens.type_id = type;
        }

        post('/api/contact-lenses', contactLens)
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

            <Form
                validationSchema={schema}
                getContext={() => ({ creatingPatient, creatingBrand, creatingType })}
                initialValues={getInitialValues()}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit}>
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

                        <PickOrNewContactLensBrandType.Formik
                            brandName="brand"
                            brand={values.brand}
                            creatingBrand={creatingBrand}
                            setCreatingBrand={setCreatingBrand}
                            typeName="type"
                            type={values.type}
                            creatingType={creatingType}
                            setCreatingType={setCreatingType}
                            durationName="duration"
                            duration={values.duration}
                        />

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
                            <label htmlFor="quantity">Quantity</label>
                            <input type="text" id="quantity" name="quantity" onChange={handleChange} value={values.quantity} />
                        </div>
                        <FieldError name="quantity" />

                        <div className="input-wrapper">
                            <label htmlFor="price">Cost</label>
                            <MoneyInput.Formik value={values.price} name="price" />
                        </div>
                        <FieldError name="price" />

                        <div className="input-wrapper">
                            <label htmlFor="solutions">Solutions</label>
                            <input type="text" id="solutions" name="solutions" onChange={handleChange} value={values.solutions} />
                        </div>
                        <FieldError name="solutions" />

                        <input type="submit" value="Create" />
                    </form>
                )}
            />
        </Modal>
    );
};
