import React, { useCallback } from 'react';
import * as yup from 'yup';
import { RouterModal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { patch, post } from '../../../helpers';
import { useForm } from '../../../hooks/useForm';
import { useHistory } from '../../../hooks/useRouter';
import { fetchUser } from '../../../utilities/fetchUser';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    email: yup.string().email().required().label('Email'),
});

export const UserModal = ({ onSuccess, editing }) => {
    const history = useHistory();

    const getInitialValues = useCallback(async (id) => {
        if (!id) {
            return {
                name: '',
                email: '',
            };
        }

        const user = await fetchUser(id);

        return {
            name: user.name,
            email: user.email,
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
            ? patch(`/api/users/${editing.id}`, values)
            : post('/api/users', values);

        request()
            .then(() => {
                onSuccess();
                history.goBack();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <RouterModal>
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
        </RouterModal>
    );
};
