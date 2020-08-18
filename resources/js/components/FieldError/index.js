import React from 'react';
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
    const error = errors[name];

    return error && typeof error === 'string' ? (
        <p className="field-error">{error}</p>
    ) : null;
};
