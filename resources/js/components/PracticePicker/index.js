import React from 'react';
import { connect } from 'formik';
import { usePractices } from './usePractices';

const BasePracticePicker = ({
    value,
    onChange,
    formik,
    name = 'practice_id',
    emptyText = 'Please Choose',
}) => {
    const { practices } = usePractices();

    const handleChange = (e) => {
        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, e.target.value);
        }

        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <>
            <label htmlFor={name}>Practice</label>
            <select name={name} value={value} onChange={handleChange}>
                <option value="">{emptyText}</option>
                {(practices || []).map(practice => (
                    <option value={practice.id} key={practice.id}>
                        {practice.name}
                    </option>
                ))}
            </select>
        </>
    );
}

export const PracticePicker = connect(BasePracticePicker);
