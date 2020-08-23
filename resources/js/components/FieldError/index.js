import React, { useMemo } from 'react';
import { connect, getIn } from 'formik';
import { useFormContext } from '../Form';

export const FieldError = connect(({ formik, name }) => {
    const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);

    if (getIn(formik.values, name) === undefined) {
        throw new Error(`Field ${name} not recognized (in FieldError component)!`);
    }

    return error && typeof error === 'string' && touched ? (
        <p className="field-error">{error}</p>
    ) : null;
});

export const FieldErrorNew = ({ name }) => {
    const { errors } = useFormContext();

    const errorMessages = useMemo(() => {
        const err = errors[name];

        if (!err) return [];

        if (typeof err === 'string') {
            return [err];
        }

        if (typeof err === 'object') {
            return Object.values(err);
        }
        
        return [];
    }, [errors, name]);

    return errorMessages.length > 0 ? errorMessages.map(error => (
        <p className="field-error" key={error}>{error}</p>
    )) : null;
};
