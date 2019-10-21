import { useState, useEffect } from 'react';
import { fetchLab } from '../../../utilities/fetchLab';

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

        fetchLab(id)
            .then((lab) => {
                setInitialValues({
                    name: lab.name,
                });

                setLoading(false);
            });
    }, [id]);

    const reset = () => {
        setInitialValues(isEditing ? null : getInitialValues());
    };

    return [initialValues, loading, reset];
};
