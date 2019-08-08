import { useState, useEffect } from 'react';
import { fetchManufacturer } from '../../../../utilities/fetchManufacturer';

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

        fetchManufacturer(id)
            .then((manufacturer) => {
                setInitialValues({
                    name: manufacturer.name,
                });

                setLoading(false);
            });
    }, [id]);

    const reset = () => {
        setInitialValues(isEditing ? null : getInitialValues());
    };

    return [initialValues, loading, reset];
}
