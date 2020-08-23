import React, { useCallback, useMemo } from 'react';
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
    password: yup.string().when('$editing', {
        is: true,
        then: yup.string().nullable(),
        otherwise: yup.string().required(),
    }).label('Password'),
});

export const UserModal = ({ show, hide, onSuccess, editing }) => {
    const getInitialValues = useCallback((user) => ({
        name: user ? user.name: '',
        email: user ? user.email : '',
        password: '',
    }), []);

    const context = useMemo(() => ({ editing: !!editing }), [editing]);

    const {
        values,
        loading,
        createNativeHandler,
        errors,
        submitHandler,
        isValid,
    } = useForm({ editing, getInitialValues, schema, context, showing: show });

    const handleSubmit = submitHandler(() => {
        const { password, ...vals } = values;

        if (password) {
            vals.password = password;
        }
        
        const request = () => editing
            ? patch(`/api/users/${editing.id}`, vals)
            : post('/api/users', vals);

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

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={createNativeHandler('password')}
                                value={values.password}
                                autoComplete="new-password"
                            />
                        </div>
                        <FieldError name="password" />

                        {editing ? (
                            <p style={{ fontSize: '0.875rem', marginBottom: '.75rem' }}>
                                Leave this field empty to leave the password untouched.
                            </p>
                        ) : null}

                        <input type="submit" value={editing ? 'Save' : 'Create'} disabled={!isValid} />
                    </>
                )}
            </Form>
        </Modal>
    );
};
