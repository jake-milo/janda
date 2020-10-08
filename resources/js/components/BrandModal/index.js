import React, { useState, useCallback } from 'react';
import * as yup from 'yup';
import { Modal } from '../Modal';
import { PageTitle } from '../PageTitle';
import { Form } from '../Form';
import { PickOrNewManufacturer } from '../ManufacturerPicker/PickOrNewManufacturer';
import { post, patch } from '../../helpers';
import { FieldError } from '../FieldError';
import { useForm } from '../../hooks/useForm';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    manufacturer: yup.string().required().label('Manufacturer'),
});

export const BrandModal = ({ show, hide, onSuccess, brand: editing = null }) => {
    const getInitialValues = useCallback(async (brand) => {
        return {
            name: brand ? brand.name : '',
            manufacturer: brand ? brand.manufacturer.id : '',
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

    const [creatingManufacturer, setCreatingManufacturer] = useState(false);

    const handleSubmit = submitHandler(() => {
        const { manufacturer, ...brand } = values;

        brand[creatingManufacturer ? 'manufacturer' : 'manufacturer_id'] = manufacturer;

        const request = () => editing
            ? patch(`/api/brands/${editing.id}`, brand)
            : post('/api/brands', brand);

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
            <PageTitle>{editing ? 'Update Brand' : 'Create Brand'}</PageTitle>

            <Form values={values} loading={loading} onSubmit={handleSubmit} errors={errors}>
                {() => (
                    <>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={createNativeHandler('name')} value={values.name} />
                        </div>
                        <FieldError name="name" />

                        <PickOrNewManufacturer
                            name="manufacturer"
                            value={values.manufacturer}
                            creating={creatingManufacturer}
                            setCreating={setCreatingManufacturer}
                            onChange={createHandler('manufacturer')}
                        />
                        <FieldError name="manufacturer" />

                        <input type="submit" value={editing ? `Update` : `Create`} disabled={!isValid} />
                    </>
                )}
            </Form>
        </Modal>
    );
};
