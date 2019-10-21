import React, { useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'formik';

export const MoneyInput = ({ value, onChange, formik, name, disabled = false, placeholder = null }) => {
    const handleChange = ({ floatValue }) => {
        const value = floatValue * 100;

        if (onChange) {
            onChange(value);
        }

        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, value);
        }
    };

    const formattedPlaceholder = useMemo(() => {
        if (!placeholder) return null;

        const formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        });

        const formatted = formatter.format(placeholder / 100);

        return formatted.endsWith('.00')
            ? formatted.slice(0, -3)
            : formatted;
    }, [placeholder]);

    return (
        <NumberFormat
            name={name}
            value={value ? value / 100 : ''}
            thousandSeparator
            prefix="£"
            onValueChange={handleChange}
            disabled={disabled}
            placeholder={formattedPlaceholder}
        />
    );
}

MoneyInput.Formik = connect(MoneyInput);
