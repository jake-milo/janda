import React from 'react';
import * as yup from 'yup';
import { useInitalValues } from './useInitalValues';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { patch, post } from '../../../helpers';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    duration: yup.string().required().label('Duration')
});

export const ContactLensTypeModal = ({ show, hide, onSuccess, editing = null, brand }) => {
    console.log(editing);
    const initialValues = useInitalValues(editing);

    const handleSubmit = (type, { setSubmitting }) => {

        const request = () => editing
            ? patch(`/api/contact-lens-brands/${brand.id}/types/${editing.id}`, type)
            : post(`/api/contact-lens-brands/${brand.id}/types`, type);

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
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>

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

                        <div className="input-wrapper">
                            <label htmlFor="duration">Duration</label>
                            <input type="text" id="duration" name="duration" onChange={handleChange} value={values.duration} />
                        </div>
                        <FieldError name="duration" />

                        <input type="submit" value={editing ? `Update` : `Create`} />
                    </form>
                )}
            />
        </Modal>
    );
};
