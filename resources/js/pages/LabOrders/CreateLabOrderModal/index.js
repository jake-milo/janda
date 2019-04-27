import React from 'react';
import { Formik } from 'formik';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { usePractices } from './usePractices';

const getInitialValues = () => ({
    patient_id: '',
    practice_id: '',
    lab_id: '',
    lens: '',
    reference: '',
    date_sent: '',
    date_required: '',
    date_received: '',
});

export const CreateLabOrderModal = ({ show, hide }) => {
    const { practices } = usePractices();

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>Create Lab Order</PageTitle>

            <Formik
                initialValues={getInitialValues()}
                render={({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit}>
                        <label for="practice_id">Practice</label>
                        <select name="practice_id" value={values.practice_id} onChange={handleChange}>
                            {(practices || []).map(practice => (
                                <option value={practice.id}>
                                    {practice.name}
                                </option>
                            ))}
                        </select>
                    </form>
                )}
            />
        </Modal>
    );
};
