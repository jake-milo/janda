import React from 'react';
import * as yup from 'yup';
import { useInitialValues } from './useInitialValues';
import { patch, post } from '../../../helpers';
import { Modal } from '../../../components/Modal';
import { Spinner } from '../../../components/Spinner';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { PageTitle } from '../../../components/PageTitle';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const PatientModal = ({ show, hide, onSuccess, editing }) => {
    const [initialValues, loading, resetInitialValues] = useInitialValues(editing);

    const handleSubmit = (patient, { setSubmitting }) => {
        const request = () => editing
            ? patch(`/api/patients/${editing}`, patient)
            : post('/api/patients', patient);

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

    const onHide = () => {
        hide();
        resetInitialValues();
    };

    return (
        <Modal show={show} hide={onHide}>
            <PageTitle>{editing ? 'Update Patient' : 'Create Patient'}</PageTitle>

            {loading && (
                <Spinner />
            )}

            <Form
                validationSchema={schema}
                initialValues={initialValues}
                enableReinitialize={!!editing}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit} style={{ display: loading ? 'none' : 'block' }}>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} value={values.name} />
                        </div>
                        <FieldError name="name" />

                        <input type="submit" value={editing ? 'Save' : 'Create'} />
                    </form>
                )}
            />
        </Modal>
    );
};
