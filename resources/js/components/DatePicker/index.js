import React, { useMemo } from 'react';
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
}) => {
    useMomentValidator(value);
    const date = useMemo(() => value ? value.toDate() : null, [value]);

    const handleChange = (val) => {
        const newVal = val ? moment(val) : '';

        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, newVal);
        }

        if (onChange) {
            onChange(newVal);
        }
    };

    return (
        <Picker
            selected={date}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
        />
    );
};

export const DatePicker = connect(BaseDatePicker);
