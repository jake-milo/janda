import React from 'react';
import * as yup from 'yup';
import { post, patch } from '../../../helpers';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

const useInitialValues = lab => ({
    name: lab ? lab.name : '',
});

export const LabModal = ({ show, hide, onSuccess, editing }) => {
    const initialValues = useInitialValues(editing);

    const handleSubmit = (values, { setSubmitting }) => {
        const request = () => editing
            ? patch(`/api/labs/${editing.id}`, values)
            : post('/api/labs', values);

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

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update Lab' : 'Create Lab'}</PageTitle>

            <Form
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit}>
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
