import React from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'formik';

export const MoneyInput = ({ value, onChange, formik, name, disabled = false }) => {
    const handleChange = ({ floatValue }) => {
        const value = floatValue * 100;

        if (onChange) {
            onChange(value);
        }

        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, value);
        }
    };

    return (
        <NumberFormat
            name={name}
            value={value ? value / 100 : ''}
            thousandSeparator
            prefix="£"
            onValueChange={handleChange}
            disabled={disabled}
        />
    );
}

MoneyInput.Formik = connect(MoneyInput);
