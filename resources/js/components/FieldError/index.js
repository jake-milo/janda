import React from 'react';
import { connect, getIn } from 'formik';

export const FieldError = connect(({ formik, name }) => {
    const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);

    return error && touched ? (
        <p className="field-error">{error}</p>
    ) : null;
});
