import React, { useState, useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { PracticePicker } from '../../../components/PracticePicker';
import { post, patch } from '../../../helpers';
import { FieldErrorNew } from '../../../components/FieldError';
import { MoneyInput } from '../../../components/MoneyInput';
import { PickOrNewPatient } from '../../../components/PatientPicker/PickOrNewPatient';
import { FormNew } from '../../../components/Form';
import { PickOrNewContactLensBrandType } from '../../../components/PickOrNewContactLensBrandType';
import { fetchContactLens } from '../../../utilities/fetchContactLens';
import { useForm } from '../../../hooks/useForm';

const schema = yup.object().shape({
    patient: yup.string().required().label('Patient'),
    practice: yup.string().required().label('Practice'),
    brand: yup.string().required().label('Brand'),
    type: yup.string().required().label('Model'),
    duration: yup.mixed().when('$creatingType', {
        is: true,
        then: yup.string().required(),
        otherwise: yup.mixed().notRequired(),
    }).label('Duration'),
    left: yup.string().required().label('Left'),
    right: yup.string().required().label('Right'),
    quantity: yup.string().required().label('Quantity'),
    price: yup.number().transform(v => isNaN(v) ? undefined : v).required().label('Cost'),
    solutions: yup.string().required().label('Solutions'),
});

export const ContactLensModal = ({ show, hide, onSuccess, editing }) => {
    const [creatingPatient, setCreatingPatient] = useState(false);
    const [creatingBrand, setCreatingBrand] = useState(false);
    const [creatingType, setCreatingType] = useState(false);

    const getInitialValues = useCallback(async (id) => {
        if (!id) return {
            patient: '',
            practice: '',
            brand: '',
            type: '',
            duration: '',
            left: '',
            right: '',
            quantity: '',
            price: '',
            solutions: '',
        };

        const contactLens = await fetchContactLens(id);

        return {
            patient: contactLens.patient.id,
            practice: contactLens.practice.id,
            brand: contactLens.type.brand.id,
            type: contactLens.type.id,
            duration: contactLens.duration,
            left: contactLens.left,
            right: contactLens.right,
            quantity: contactLens.quantity,
            price: contactLens.raw_price,
            solutions: contactLens.solutions,
        };
    }, []);

    const context = useMemo(() => ({ creatingType }), [creatingType]);

    const { 
        values,
        loading,
        createHandler,
        createNativeHandler,
        errors,
        submitHandler,
        isValid,
    } = useForm({ editing, getInitialValues, schema, context, showing: show });

    const handleSubmit = submitHandler(() => {
        const { patient, brand, type, duration, practice, ...contactLens } = values;

        contactLens.practice_id = practice;
        contactLens[creatingPatient ? 'patient' : 'patient_id'] = patient;
        contactLens[creatingBrand ? 'brand' : 'brand_id'] = brand;
        contactLens[creatingType || creatingBrand ? 'type' : 'type_id'] = type;

        if (creatingType || creatingBrand) {
            contactLens.duration = duration;
        }

        const request = () => editing
            ? patch(`/api/contact-lenses/${editing}`, contactLens)
            : post('/api/contact-lenses', contactLens);

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
            <PageTitle>{editing ? 'Update' : 'Create'} Contact Lens</PageTitle>

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
                            <PracticePicker name="practice" value={values.practice} onChange={createHandler('practice')} />
                        </div>
                        <FieldErrorNew name="practice" />

                        <PickOrNewContactLensBrandType
                            brandName="brand"
                            brand={values.brand}
                            onBrandChange={createHandler('brand')}
                            typeName="type"
                            type={values.type}
                            onTypeChange={createHandler('type')}
                            durationName="duration"
                            duration={values.duration}
                            onDurationChange={createHandler('duration')}
                            creatingBrand={creatingBrand}
                            setCreatingBrand={setCreatingBrand}
                            creatingType={creatingType}
                            setCreatingType={setCreatingType}
                        />

                        <div className="input-wrapper">
                            <label htmlFor="lens">Left</label>
                            <input type="text" id="left" name="left" onChange={createNativeHandler('left')} value={values.left} />
                        </div>
                        <FieldErrorNew name="left" />

                        <div className="input-wrapper">
                            <label htmlFor="lens">Right</label>
                            <input type="text" id="right" name="right" onChange={createNativeHandler('right')} value={values.right} />
                        </div>
                        <FieldErrorNew name="right" />

                        <div className="input-wrapper">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="text" id="quantity" name="quantity" onChange={createNativeHandler('quantity')} value={values.quantity} />
                        </div>
                        <FieldErrorNew name="quantity" />

                        <div className="input-wrapper">
                            <label htmlFor="price">Cost</label>
                            <MoneyInput value={values.price} name="price" onChange={createHandler('price')} />
                        </div>
                        <FieldErrorNew name="price" />

                        <div className="input-wrapper">
                            <label htmlFor="solutions">Solutions</label>
                            <input type="text" id="solutions" name="solutions" onChange={createNativeHandler('solutions')} value={values.solutions} />
                        </div>
                        <FieldErrorNew name="solutions" />

                        <input type="submit" value={editing ? 'Update' : 'Create'} errors={errors} disabled={!isValid} />
                    </>
                )}
            </FormNew>

            {/* {loading && (
                <Spinner />
            )}

            <Form
                validationSchema={schema}
                getContext={() => ({ creatingPatient, creatingBrand, creatingType })}
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
            /> */}
        </Modal>
    );
};
