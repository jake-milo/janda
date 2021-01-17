import React, { useCallback } from 'react';
import * as yup from 'yup';
import { patch, post } from '../../../helpers';
import { FieldError } from '../../../components/FieldError';
import { RouterModal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { useForm } from '../../../hooks/useForm';
import { useHistory } from '../../../hooks/useRouter';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const ContactLensBrandModal = ({ onSuccess, brand: editing = null }) => {
    const history = useHistory();
    
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
    } = useForm({ editing, getInitialValues, schema });

    const handleSubmit = submitHandler(() => {
        const request = () => editing
            ? patch(`/api/contact-lens-brands/${editing.id}`, values)
            : post('/api/contact-lens-brands', values);

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
            <PageTitle>{editing ? 'Update Brand' : 'Create Brand'}</PageTitle>

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

                        <input type="submit" value={editing ? `Update` : `Create`} disabled={!isValid} />
                    </>
                )}
            </Form>
        </RouterModal>
    );
};
