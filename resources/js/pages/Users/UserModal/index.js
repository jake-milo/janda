import React from 'react';
import * as yup from 'yup';
import { useInitialValues } from './useInitialValues';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { patch, post } from '../../../helpers';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().label('Password'),
});

export const UserModal = ({ show, hide, onSuccess, editing }) => {
    const initialValues = useInitialValues(editing);

    const handleSubmit = (values, { setSubmitting }) => {
        const request = () => editing
            ? patch(`/api/users/${editing.id}`, values)
            : post('/api/users', values);

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
            <PageTitle>{editing ? 'Update User' : 'Create User'}</PageTitle>

            <Form
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit} autoComplete="off">

                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} value={values.name} />
                        </div>
                        <FieldError name="name" />

                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={handleChange} value={values.email} autoComplete="new-email" />
                        </div>
                        <FieldError name="email" />

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={handleChange} value={values.password} autoComplete="new-password" />
                        </div>
                        <FieldError name="password" />
                        {editing ? (
                            <p style={{ fontSize: '0.875rem', marginBottom: '.75rem' }}>
                                Leave this field empty to leave the password untouched.
                            </p>
                        ) : null}

                        <input type="submit" value={editing ? 'Save' : 'Create'} />
                    </form>
                )}
            />
        </Modal>
    );
};
