import React, { useCallback } from 'react';
import * as yup from 'yup';
import { Form } from '../Form';
import { FieldError } from '../FieldError';
import { Modal } from '../Modal';
import { PageTitle } from '../PageTitle';
import { post, patch } from '../../helpers';
import { fetchManufacturer } from '../../utilities/fetchManufacturer';
import { useForm } from '../../hooks/useForm';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const ManufacturerModal = ({ show, hide, onSuccess, editing }) => {
    console.log(editing);
    const getInitialValues = useCallback(async (id) => {
        if (!id) return {
            name: '',
        };

        const manufacturer = await fetchManufacturer(id);

        return {
            name: manufacturer.name,
        };
    }, []);

    const {
        values,
        loading,
        createNativeHandler,
        errors,
        submitHandler,
        isValid,
    } = useForm({ editing, getInitialValues, schema });


    const handleSubmit = submitHandler(() => {
        const request = () => editing
            ? patch(`/api/manufacturers/${editing}`, values)
            : post('/api/manufacturers', values);

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
            <PageTitle>{editing ? 'Update Manufacturer' : 'Create Manufacturer'}</PageTitle>

            <Form values={values} loading={loading} onSubmit={handleSubmit}>
                {() => (
                    <>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={createNativeHandler('name')}
                                value={values.name}
                            />
                        </div>
                        <FieldError name="name" errors={errors} />

                        <input type="submit" value={editing ? 'Save' : 'Create'} disabled={!isValid} />
                    </>
                )}

            </Form>
        </Modal>
    );
};
