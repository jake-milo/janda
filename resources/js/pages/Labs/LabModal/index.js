import React from 'react';
import * as yup from 'yup';
import { useInitialValues } from './useInitialValues';
import { patch, post } from '../../../helpers';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Spinner } from '../../../components/Spinner';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const LabModal = ({ show, hide, onSuccess, editing }) => {
    const [initialValues, loading, resetInitialValues] = useInitialValues(editing);

    const handleSubmit = (lab, { setSubmitting }) => {
        const request = () => editing
            ? patch(`/api/labs/${editing}`, lab)
            : post('/api/labs', lab);

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
            <PageTitle>{editing ? 'Update Lab' : 'Create Lab'}</PageTitle>

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
