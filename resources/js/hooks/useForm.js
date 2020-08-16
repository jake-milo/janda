import { useState, useEffect } from "react";
import { useYup } from "./useYup";

export const useForm = ({
    editing,
    schema,
    getInitialValues,
    context,
}) => {
    const [values, setValues] = useState(null);
    const [loading, setLoading] = useState(true);

    const { errors, submitHandler, isValid } = useYup(values, schema, {
        context,
        validateOnChange: true,
    });

    useEffect(() => {
        setLoading(true);

        const asyncify = async (promise) => promise;

        asyncify(getInitialValues(editing))
            .then(vals => {
                setValues(vals);
                setLoading(false);
            });
    }, [getInitialValues, editing]);

    const createHandler = (key, transform = v => v) => e => {
        const val = transform(e);

        setValues(prev => ({
            ...prev,
            [key]: val,
        }));
    }

    return {
        values,
        loading,
        createHandler,
        createNativeHandler: (key) => createHandler(key, e => e.target.value),
        errors,
        submitHandler,
        isValid,
    };
};
