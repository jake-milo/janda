import React, { useState } from 'react';
import * as yup from 'yup';
import { Modal } from '../Modal';
import { PageTitle } from '../PageTitle';
import { Form } from '../Form';
import { PickOrNewManufacturer } from '../ManufacturerPicker/PickOrNewManufacturer';
import { post, patch } from '../../helpers';
import { FieldError } from '../FieldError';
import { useInitialValues } from './useInitialValues';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    manufacturer: yup.mixed().when('$creatingManufacturer', {
        is: true,
        then: yup.string(),
        otherwise: yup.number().integer().positive(),
    }).required().label('Manufacturer'),
});

export const BrandModal = ({ show, hide, onSuccess, brand: editing = null }) => {
    const initialValues = useInitialValues(editing);
    const [creatingManufacturer, setCreatingManufacturer] = useState(false);

    const handleSubmit = (values, { setSubmitting }) => {
        const { manufacturer, ...brand } = values;

        brand[creatingManufacturer ? 'manufacturer' : 'manufacturer_id'] = manufacturer;

        const request = () => editing
            ? patch(`/api/brands/${editing.id}`, brand)
            : post('/api/brands', brand);

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
            <PageTitle>{editing ? 'Update Brand' : 'Create Brand'}</PageTitle>

            <Form
                validationSchema={schema}
                getContext={() => ({ creatingManufacturer })}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} value={values.name} />
                        </div>
                        <FieldError name="name" />

                        <PickOrNewManufacturer.Formik
                            name="manufacturer"
                            value={values.manufacturer}
                            creating={creatingManufacturer}
                            setCreating={setCreatingManufacturer}
                        />
                        <FieldError name="manufacturer" />

                        <input type="submit" value={editing ? `Update` : `Create`} />
                    </form>
                )}
            />
        </Modal>
    );
};
