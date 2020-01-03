import { useState, useEffect } from 'react';
import { fetchManufacturer } from '../../utilities/fetchManufacturer';

const getInitialValuesFromManufacturer = manufacturer => ({
    name: manufacturer.name,
});

const getInitialValues = () => ({
    name: '',
});

const determineInitialValues = (isProvided, isEditing, provided) => isProvided
    ? getInitialValuesFromManufacturer(provided)
    : (isEditing ? null : getInitialValues());

export const useInitialValues = (id, isProvided) => {
    const isEditing = !!id && !isProvided;
    const [initialValues, setInitialValues] = useState(determineInitialValues(isProvided, isEditing, id));
    const [loading, setLoading] = useState(isEditing && !isProvided);

    useEffect(() => {
        if (!id || isProvided) return;

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
        setInitialValues(determineInitialValues(isProvided, isEditing, id));
    };

    return [initialValues, loading, reset];
}
