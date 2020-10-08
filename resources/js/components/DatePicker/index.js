import React, { useMemo, useEffect } from 'react';
import moment from 'moment';
import Picker from 'react-datepicker';
import { useMomentValidator } from './useMomentValidator';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

export const DatePicker = ({
    value,
    onChange,
    name,
    min,
    monthOnly = false,
    placeholder,
}) => {
    useMomentValidator(value);
    useMomentValidator(min || '');

    useEffect(() => {
        if (min && value && value.isBefore(min)) {
            handleChange(min);
        }
    }, [min]);

    const date = useMemo(() => value ? value.toDate() : null, [value]);
    const minDate = useMemo(() => min ? min.toDate() : null, [min]);

    const handleChange = (val) => {
        if (onChange) {
            onChange(val);
        }
    };

    const format = monthOnly ? 'MMMM yyyy' : 'dd/MM/yyyy';

    return (
        <Picker
            placeholderText={moment.isMoment(placeholder) ? placeholder.format(format) : placeholder}
            selected={date}
            onChange={val => handleChange(val ? moment(val) : '')}
            dateFormat={format}
            minDate={minDate}
            showMonthYearPicker={monthOnly}
            showFullMonthYearPicker={monthOnly}
        />
    );
};
