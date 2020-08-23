import React, { useCallback } from 'react';
import * as yup from 'yup';
import { patch, post } from '../../../helpers';
import { Modal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { fetchLab } from '../../../utilities/fetchLab';
import { useForm } from '../../../hooks/useForm';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
});

export const LabModal = ({ show, hide, onSuccess, editing }) => {
    const getInitialValues = useCallback(async (id) => {
        if (!id) return {
            name: '',
        };

        const lab = await fetchLab(id);

        return {
            name: lab.name,
        };
    }, []);

    const {
        values,
        loading,
        createNativeHandler,
        errors,
        submitHandler,
        isValid,
    } = useForm({ editing, getInitialValues, schema, showing: show });

    const handleSubmit = submitHandler(() => {
        const request = () => editing
            ? patch(`/api/labs/${editing}`, values)
            : post('/api/labs', values);

        request()
            .then(() => {
                hide();
                onSuccess();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update Lab' : 'Create Lab'}</PageTitle>

            <Form values={values} loading={loading} onSubmit={handleSubmit} errors={errors}>
                {() => (
                    <>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={createNativeHandler('name')}
                                value={values.name}
                            />
                        </div>
                        <FieldError name="name" />

                        <input type="submit" value={editing ? 'Save' : 'Create'} disabled={!isValid} />
                    </>
                )}
            </Form>
        </Modal>
    );
};
