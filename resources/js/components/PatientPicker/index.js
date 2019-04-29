import React, { useState } from 'react';
import { FilterableSelect } from '../FilterableSelect';
import { usePatients } from './usePatients';
import { useDebounced } from '../../hooks/useDebounced';

export const PatientPicker = ({ value, onChange, emptyText = 'Please Choose' }) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { patients, loading } = usePatients({ filter: debouncedFilter });

    const getPracticeLabel = val => patients.find(patient => patient.id === val).name;

    console.log(value);

    return (
        <>
            <label htmlFor="patient_id">Patient</label>
            <FilterableSelect
                name="patient_id"
                onChange={onChange}
                value={value}
                filter={filter}
                onFilterChange={setFilter}
                options={patients}
                getIdentifier={patient => patient.id}
                getLabel={id => id ? getPracticeLabel(id) : emptyText}
                loading={loading}
            />
        </>
    );
};
