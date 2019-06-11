import React from 'react';
import { Formik, yupToFormErrors, validateYupSchema } from 'formik';

export const Form = ({ getContext, validationSchema, ...rest }) => (
    <Formik
        validate={vals =>
            validateYupSchema(vals, validationSchema, false, getContext(vals))
                .catch((err) => {
                    throw yupToFormErrors(err);
                })
        }
        {...rest}
    />
);
