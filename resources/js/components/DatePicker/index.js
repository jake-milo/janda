import React, { useMemo, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'formik';
import Picker from 'react-datepicker';
import { useMomentValidator } from './useMomentValidator';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

const BaseDatePicker = ({
    value,
    onChange,
    formik,
    name,
    min,
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
        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, val);
        }

        if (onChange) {
            onChange(val);
        }
    };

    return (
        <Picker
            selected={date}
            onChange={val => handleChange(val ? moment(val) : '')}
            dateFormat="dd/MM/yyyy"
            minDate={minDate}
        />
    );
};

export const DatePicker = connect(BaseDatePicker);
