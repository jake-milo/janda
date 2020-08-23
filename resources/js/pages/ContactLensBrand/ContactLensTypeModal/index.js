import React, { useCallback } from 'react';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { FormNew } from '../../../components/Form';
import { FieldErrorNew } from '../../../components/FieldError';
import { patch, post } from '../../../helpers';
import { useForm } from '../../../hooks/useForm';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    duration: yup.string().required().label('Duration')
});

export const ContactLensTypeModal = ({ show, hide, onSuccess, editing = null, brand }) => {
    const getInitialValues = useCallback((editing) => {
        if (!editing) return {
            name: '',
            duration: '',
        };

        return {
            name: editing.name,
            duration: editing.duration,
        }
    }, []);

    const {
        values,
        submitHandler,
        errors,
        isValid,
        loading,
        createNativeHandler,
    } = useForm({ schema, editing, showing: show, getInitialValues });

    const handleSubmit = submitHandler(() => {
        const request = () => editing
            ? patch(`/api/contact-lens-brands/${brand.id}/types/${editing.id}`, values)
            : post(`/api/contact-lens-brands/${brand.id}/types`, values);

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
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>

            <FormNew values={values} errors={errors} loading={loading} onSubmit={handleSubmit}>
                {() => (
                    <>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={createNativeHandler('name')} value={values.name} />
                        </div>
                        <FieldErrorNew name="name" />

                        <div className="input-wrapper">
                            <label htmlFor="duration">Duration</label>
                            <input type="text" id="duration" name="duration" onChange={createNativeHandler('duration')} value={values.duration} />
                        </div>
                        <FieldErrorNew name="duration" />

                        <input type="submit" value={editing ? `Update` : `Create`} disabled={!isValid} />
                    </>
                )}
            </FormNew>
        </Modal>
    );
};
