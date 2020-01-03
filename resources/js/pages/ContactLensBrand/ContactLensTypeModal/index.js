import React from 'react';
import * as yup from 'yup';
import { useInitalValues } from './useInitalValues';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    duration: yup.string().required().label('Duration')
});

export const ContactLensTypeModal = ({ show, hide, onSuccess, editing = null }) => {
    console.log(editing);
    const initalValues = useInitalValues(editing);

    const handleSubmit = (values) => {
        console.log('submit', values);
    };

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>

            <Form
                validationSchema={schema}
                initalValues={initalValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (
                    <form onSubmit={onSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} value={values.name} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="duration">Duration</label>
                            <input type="text" id="duration" name="duration" onChange={handleChange} value={values.duration} />
                        </div>

                        <input type="submit" value={editing ? `Update` : `Create`} />
                    </form>
                )}
            />
        </Modal>
    );
};
