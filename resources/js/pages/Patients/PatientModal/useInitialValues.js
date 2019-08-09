import { useState, useEffect } from 'react';
import { fetchPatient } from '../../../utilities/fetchPatient';

const getInitialValues = () => ({
    name: '',
});

export const useInitialValues = (id) => {
    const isEditing = !!id;
    const [initialValues, setInitialValues] = useState(isEditing ? null : getInitialValues());
    const [loading, setLoading] = useState(isEditing);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetchPatient(id)
            .then((patient) => {
                setInitialValues({
                    name: patient.name,
                });

                setLoading(false);
            });
    }, [id]);

    const reset = () => {
        setInitialValues(isEditing ? null : getInitialValues());
    };

    return [initialValues, loading, reset];
};
