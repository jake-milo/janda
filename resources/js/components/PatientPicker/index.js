import React, { useState } from 'react';
import { connect } from 'formik';
import { FilterableSelect } from '../FilterableSelect';
import { usePatients } from './usePatients';
import { useDebounced } from '../../hooks/useDebounced';

const BasePatientPicker = ({
    name,
    value,
    formik,
    emptyText = 'Please Choose',
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { patients, loading } = usePatients({ filter: debouncedFilter });

    console.log(formik);

    const handleChange = (newVal) => {
        formik.setFieldValue(name, newVal);
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

export const PatientPicker = connect(BasePatientPicker);

