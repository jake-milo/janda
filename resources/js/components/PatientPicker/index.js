import React, { useState } from 'react';
import { connect } from 'formik';
import { FilterableSelect } from '../FilterableSelect';
import { usePatients } from './usePatients';
import { useDebounced } from '../../hooks/useDebounced';

export const PatientPicker = ({
    name,
    value,
    formik,
    onChange,
    emptyText = 'Please Choose',
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { patients, loading } = usePatients({ filter: debouncedFilter });

    const handleChange = (newVal) => {
        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, newVal);
        }

        if (onChange) {
            onChange(newVal);
        }
    };

    return (
        <>
            <label htmlFor={name}>Patient</label>
            <FilterableSelect
                emptyText={emptyText}
                onChange={handleChange}
                value={value}
                filter={filter}
                onFilterChange={setFilter}
                options={(patients || []).map(patient => ({
                    value: patient.id,
                    label: patient.name,
                }))}
                loading={loading}
            />
        </>
    );
};

PatientPicker.Formik = connect(PatientPicker);
