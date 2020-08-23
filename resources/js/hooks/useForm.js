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

    const createArrHandler = (key, index, property, transform = v => v) => e => {
        const val = transform(e);

        setValues(prev => ({
            ...prev,
            [key]: prev[key].map((itm, i) => {
                if (i === index) {
                    return {
                        ...itm,
                        [property]: val,
                    };
                }

                return itm;
            }),
        }));
    };

    const newArrayItem = (key, shape) => {
        setValues(prev => ({
            ...prev,
            [key]: [
                ...prev[key],
                shape,
            ],
        }));
    };

    const removeArrayItem = (key, index) => {
        setValues(prev => ({
            ...prev,
            [key]: [
                ...prev[key].slice(0, index),
                ...prev[key].slice(index + 1),
            ],
        }));
    };

    return {
        values,
        loading,
        createHandler,
        createNativeHandler: (key) => createHandler(key, e => e.target.value),
        createArrHandler,
        createNativeArrHandler: (key, index, property) =>
            createArrHandler(key, index, property, e => e.target.value),
        newArrayItem,
        removeArrayItem,
        errors,
        submitHandler,
        isValid,
    };
};
