import React, { useMemo } from 'react';
import { useFormContext } from '../Form';

export const FieldError = ({ name }) => {
    const { errors } = useFormContext();

    if (!errors) {
        throw new Error('No error object was found in context!');
    }

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
