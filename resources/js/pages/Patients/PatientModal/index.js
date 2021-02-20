import React, { useCallback } from 'react';
import * as yup from 'yup';
import { patch, post } from '../../../helpers';
import { RouterModal } from '../../../components/Modal';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { PageTitle } from '../../../components/PageTitle';
import { fetchPatient } from '../../../utilities/fetchPatient';
import { useForm } from '../../../hooks/useForm';
import { useHistory } from '../../../hooks/useRouter';

const schema = yup.object().shape({
    title: yup.string().optional().label('Title'),
    name: yup.string().required().label('First Name'),
    last_name: yup.string().required().label('Last Name'),
});

export const PatientModal = ({ onSuccess, editing }) => {
    const getInitialValues = useCallback(async (id) => {
        if (!id) return {
            title: '',
            name: '',
            last_name: '',
        };

        const patient = await fetchPatient(id);

        return {
            title: patient.title,
            name: patient.first_name,
            last_name: patient.last_name,
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

    const history = useHistory();


    const handleSubmit = submitHandler(() => {
        const request = () => editing
            ? patch(`/api/patients/${editing}`, values)
            : post('/api/patients', values);

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
            <PageTitle>{editing ? 'Update Patient' : 'Create Patient'}</PageTitle>

            <Form values={values} loading={loading} onSubmit={handleSubmit} errors={errors}>
                {() => (
                    <>
                        <div className="input-wrapper">
                            <label htmlFor="title">Title (optional)</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={createNativeHandler('title')}
                                value={values.title}
                            />
                        </div>
                        <FieldError name="title" />

                        <div className="input-wrapper">
                            <label htmlFor="name">First Name</label>
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
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                onChange={createNativeHandler('last_name')}
                                value={values.last_name}
                            />
                        </div>
                        <FieldError name="last_name" />

                        <input type="submit" value={editing ? 'Save' : 'Create'} disabled={!isValid} />
                    </>
                )}
            </Form>
        </RouterModal>
    );
};
