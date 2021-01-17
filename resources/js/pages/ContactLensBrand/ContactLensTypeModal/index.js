import React, { useCallback } from 'react';
import * as yup from 'yup';
import { RouterModal } from '../../../components/Modal';
import { PageTitle } from '../../../components/PageTitle';
import { Form } from '../../../components/Form';
import { FieldError } from '../../../components/FieldError';
import { patch, post } from '../../../helpers';
import { useForm } from '../../../hooks/useForm';
import { useHistory } from '../../../hooks/useRouter';
import { fetchContactLensBrandType } from '../../../utilities/fetchContactLensBrandType';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    duration: yup.string().required().label('Duration')
});

export const ContactLensTypeModal = ({ onSuccess, editing = null, brand }) => {
    const history = useHistory();

    console.log({brand});

    const getInitialValues = useCallback(async (editing) => {
        if (!editing) return {
            name: '',
            duration: '',
        };

        const type = await fetchContactLensBrandType(brand.id, editing);

        return {
            name: type.name,
            duration: type.duration,
        }
    }, [brand.id]);

    const {
        values,
        submitHandler,
        errors,
        isValid,
        loading,
        createNativeHandler,
    } = useForm({ schema, editing, getInitialValues });

    const handleSubmit = submitHandler(() => {
        const request = () => editing
            ? patch(`/api/contact-lens-brands/${brand.id}/types/${editing}`, values)
            : post(`/api/contact-lens-brands/${brand.id}/types`, values);

        request()
            .then(() => {
                onSuccess();
                history.goBack();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <RouterModal>
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>

            <Form values={values} errors={errors} loading={loading} onSubmit={handleSubmit}>
                {() => (
                    <>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={createNativeHandler('name')} value={values.name} />
                        </div>
                        <FieldError name="name" />

                        <div className="input-wrapper">
                            <label htmlFor="duration">Duration</label>
                            <input type="text" id="duration" name="duration" onChange={createNativeHandler('duration')} value={values.duration} />
                        </div>
                        <FieldError name="duration" />

                        <input type="submit" value={editing ? `Update` : `Create`} disabled={!isValid} />
                    </>
                )}
            </Form>
        </RouterModal>
    );
};
