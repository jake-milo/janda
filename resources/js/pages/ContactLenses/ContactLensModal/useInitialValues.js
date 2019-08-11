import { useState, useEffect } from 'react';
import { fetchContactLens } from "../../../utilities/fetchContactLens";

const getInitialValues = () => ({
    patient: '',
    practice_id: '',
    brand: '',
    type: '',
    duration: '',
    left: '',
    right: '',
    quantity: '',
    price: '',
    solutions: '',
});

export const useInitialValues = (id) => {
    const isEditing = !!id;
    const [initialValues, setInitialValues] = useState(isEditing ? null : getInitialValues());
    const [loading, setLoading] = useState(isEditing);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetchContactLens(id)
            .then((contactLens) => {
                setInitialValues({
                    patient: contactLens.patient.id,
                    practice_id: contactLens.practice.id,
                    brand: contactLens.type.brand.id,
                    type: contactLens.type.id,
                    duration: contactLens.duration,
                    left: contactLens.left,
                    right: contactLens.right,
                    quantity: contactLens.quantity,
                    price: contactLens.raw_price,
                    solutions: contactLens.solutions,
                });
                setLoading(false);
            });
    }, [id]);

    return [initialValues, loading];
};
