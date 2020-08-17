import React, { useCallback } from 'react';
import * as yup from 'yup';
import { patch, post } from '../../../helpers';
import { Modal } from '../../../components/Modal';
import { FormNew } from '../../../components/Form';
import { FieldErrorNew } from '../../../components/FieldError';
import { PageTitle } from '../../../components/PageTitle';
import { fetchPatient } from '../../../utilities/fetchPatient';
import { useForm } from '../../../hooks/useForm';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const PatientModal = ({ show, hide, onSuccess, editing }) => {
    const getInitialValues = useCallback(async (id) => {
        if (!id) return {
            name: '',
        };

        const patient = await fetchPatient(id);

        return {
            name: patient.name,
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
            ? patch(`/api/patients/${editing}`, values)
            : post('/api/patients', values);

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
            <PageTitle>{editing ? 'Update Patient' : 'Create Patient'}</PageTitle>

            <FormNew values={values} loading={loading} onSubmit={handleSubmit}>
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
                        <FieldErrorNew name="name" errors={errors} />

                        <input type="submit" value={editing ? 'Save' : 'Create'} disabled={!isValid} />
                    </>
                )}
            </FormNew>
        </Modal>
    );
};
