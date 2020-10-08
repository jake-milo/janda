import React, { useMemo } from 'react';
import NumberFormat from 'react-number-format';

export const MoneyInput = ({ value, onChange, name, disabled = false, placeholder = null }) => {
    const handleChange = ({ floatValue }) => {
        const value = floatValue * 100;

        if (onChange) {
            onChange(value);
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
