import { useState, useEffect } from "react";
import { useYup } from "./useYup";

export const useForm = ({
    editing,
    schema,
    getInitialValues,
    context,
    showing = false,
}) => {
    const [values, setValues] = useState(null);
    const [loading, setLoading] = useState(true);

    const { errors, submitHandler, isValid, reset: resetYup } = useYup(values, schema, {
        context,
        validateOnChange: true,
    });

    useEffect(() => {
        resetYup();
        setLoading(true);

        const asyncify = async (promise) => promise;

        asyncify(getInitialValues(editing))
            .then(vals => {
                setValues(vals);
                setLoading(false);
            });
    }, [editing, getInitialValues, showing]);

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
