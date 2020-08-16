import React from 'react';
import { Formik, yupToFormErrors, validateYupSchema } from 'formik';
import { Spinner } from '../Spinner';

export const Form = ({ validationSchema, ...props }) => (
    <Formik
        {...props}
        validate={(vals, props) => {
            console.log({ props, context: props.getContext(), vals });

            return validationSchema
                .validate(vals, { abortEarly: false, context: props.getContext() })
                .then(vals => (console.log({vals}), vals))
                .catch(err => {
                    throw yupToFormErrors(err);
                });

            return validateYupSchema(vals, validationSchema, false, getContext(vals))
                .then((newVals) => {
                    console.log({ newVals });
                    return newVals;
                })
                .catch((err) => {
                    console.log({ err });
                    throw yupToFormErrors(err);
                })
        }}
    />
);

export const FormNew = ({ children, loading, values, onSubmit }) => (
    <>
        {loading || !values ? (
            <Spinner />
        ) : null}

        {values && (
            <form onSubmit={onSubmit} style={{ display: loading ? 'none' : 'block' }}>
                {children()}
            </form>
        )}
    </>
);
