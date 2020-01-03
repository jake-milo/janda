import React, { useState } from 'react';
import * as yup from 'yup';
import { patch, post } from '../../../helpers';
import { FieldError } from '../../../components/FieldError';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { useInitialValues } from './useInitalValues';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const ContactLensBrandModal = ({ show, hide, onSuccess, brand: editing = null }) => {
    const initialValues = useInitialValues(editing);

    const handleSubmit = (brand, { setSubmitting }) => {

        const request = () => editing
            ? patch(`/api/contact-lens-brands/${editing.id}`, brand)
            : post('/api/contact-lens-brands', brand);

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
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} value={values.name} />
                        </div>
                        <FieldError name="name" />
                        <input type="submit" value={editing ? `Update` : `Create`} />
                    </form>
                )}
            />
        </Modal>
    );
};
