import React, { useCallback } from 'react';
import * as yup from 'yup';
import { patch, post } from '../../../helpers';
import { FieldErrorNew } from '../../../components/FieldError';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { FormNew } from '../../../components/Form';
import { useForm } from '../../../hooks/useForm';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const ContactLensBrandModal = ({ show, hide, onSuccess, brand: editing = null }) => {
    const getInitialValues = useCallback(async (editing) => {
        if (!editing) return {
            name: '',
        };

        return {
            name: editing.name,
        };
    }, []);

    const {
        values,
        loading,
        createNativeHandler,
        errors,
        submitHandler,
        isValid,
    } = useForm({ editing, getInitialValues, schema, showing: show });

    const handleSubmit = submitHandler(() => {
        const request = () => editing
            ? patch(`/api/contact-lens-brands/${editing.id}`, values)
            : post('/api/contact-lens-brands', values);

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

            <FormNew values={values} loading={loading} onSubmit={handleSubmit} errors={errors}>
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
                        <FieldErrorNew name="name" />

                        <input type="submit" value={editing ? `Update` : `Create`} disabled={!isValid} />
                    </>
                )}
            </FormNew>
        </Modal>
    );
};
