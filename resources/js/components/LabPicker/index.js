import React from 'react';
import { connect } from 'formik';
import { useLabs } from './useLabs';

const BaseLabPicker = ({
    name,
    value,
    onChange,
    formik,
    emptyText = 'Please Choose',
}) => {
    const { labs } = useLabs();

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
            <label htmlFor={name}>Lab</label>
            <select name={name} value={value} onChange={handleChange}>
                <option value="">{emptyText}</option>
                {(labs || []).map(lab => (
                    <option value={lab.id} key={lab.id}>
                        {lab.name}
                    </option>
                ))}
            </select>
        </>
    );
};

export const LabPicker = connect(BaseLabPicker);
