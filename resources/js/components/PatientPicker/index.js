import React, { useState } from 'react';
import { FilterableSelect } from '../FilterableSelect';
import { usePatients } from './usePatients';
import { useDebounced } from '../../hooks/useDebounced';

export const PatientPicker = ({
    name,
    value,
    onChange,
    emptyText = 'Please Choose',
    clearable,
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { patients, loading } = usePatients({ filter: debouncedFilter, include: value ? value : null });

    console.log(patients);

    const handleChange = (newVal) => {
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
                clearable={clearable}
            />
        </>
    );
};
