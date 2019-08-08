import React from 'react';
import * as yup from 'yup';
import { useInitialValues } from './useInitialValues';
import { Spinner } from '../../../../components/Spinner';
import { Form } from '../../../../components/Form';
import { FieldError } from '../../../../components/FieldError';
import { Modal } from '../../../../components/Modal';
import { PageTitle } from '../../../../components/PageTitle';
import { post, patch } from '../../../../helpers';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const CreateManufacturerModal = ({ show, hide, onSuccess, editing }) => {
    const [initialValues, loading, resetInitialValues] = useInitialValues(editing);

    const handleSubmit = (manufacturer, { setSubmitting }) => {
        const request = () => editing
            ? patch(`/api/manufacturers/${editing}`, manufacturer)
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
