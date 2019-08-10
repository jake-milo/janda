import React from 'react';
import * as yup from 'yup';
import { useInitialValues } from './useInitialValues';
import { Spinner } from '../Spinner';
import { Form } from '../Form';
import { FieldError } from '../FieldError';
import { Modal } from '../Modal';
import { PageTitle } from '../PageTitle';
import { post, patch } from '../../helpers';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const ManufacturerModal = ({ show, hide, onSuccess, editing }) => {
    const isProvided = editing && typeof editing === 'object';
    const [initialValues, loading, resetInitialValues] = useInitialValues(editing, isProvided);

    const handleSubmit = (manufacturer, { setSubmitting }) => {
        const id = () => typeof editing === 'object' ? editing.id : editing;

        const request = () => editing
            ? patch(`/api/manufacturers/${id()}`, manufacturer)
            : post('/api/manufacturers', manufacturer);

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
            <PageTitle>Create Manufacturer</PageTitle>

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
