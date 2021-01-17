import React, { useCallback } from 'react';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { patch, post } from '../../../helpers';
import { useForm } from '../../../hooks/useForm';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    email: yup.string().email().required().label('Email'),
});

export const UserModal = ({ show, hide, onSuccess, editing }) => {
    const getInitialValues = useCallback((user) => ({
        name: user ? user.name: '',
        email: user ? user.email : '',
    }), []);

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
            ? patch(`/api/users/${editing.id}`, values)
            : post('/api/users', values);

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
            <PageTitle>{editing ? 'Update User' : 'Create User'}</PageTitle>

            <Form values={values} loading={loading} onSubmit={handleSubmit} errors={errors}>
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
                        <FieldError name="name" />

                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={createNativeHandler('email')}
                                value={values.email}
                                autoComplete="new-email"
                            />
                        </div>
                        <FieldError name="email" />

                        <input type="submit" value={editing ? 'Save' : 'Create'} disabled={!isValid} />
                    </>
                )}
            </Form>
        </Modal>
    );
};
