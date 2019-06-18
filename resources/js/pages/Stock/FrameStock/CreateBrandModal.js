import React, { useState } from 'react';
import * as yup from 'yup';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';

const getInitialValues = () => ({
    name: '',
    manufacturer_id: '',
});

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    manufacturer: yup.mixed().when('$creatingManufacturer', {
        is: true,
        then: yup.string(),
        otherwise: yup.number().integer().positive(),
    }).required().label('Manufacturer'),
});

export const CreateBrandModal = ({ show, hide, onSuccess }) => {
    const [creatingManufacturer, setCreatingManufacturer] = useState(false);

    const handleSubmit = (value, { setSubmitting }) => {
        //
    };

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>Create Brand</PageTitle>

            <Form
                validationSchema={schema}
                getContext={() => ({ creatingManufacturer })}
                initialValues={getInitialValues()}
                onSubmit={handleSubmit}
            />
        </Modal>
    );
};
