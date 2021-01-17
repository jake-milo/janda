import React, { useState } from 'react';
import { useLabs } from './useLabs';
import { FilterableSelect } from '../FilterableSelect';
import { useDebounced } from '../../hooks/useDebounced';

export const LabPicker = ({
    name,
    value,
    onChange,
    emptyText = 'Please Choose',
    clearable,
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { labs, loading } = useLabs({ filter: debouncedFilter });

    const handleChange = (newVal) => {
        if (onChange) {
            onChange(newVal);
        }
    };

    return (
        <>
            <label htmlFor={name}>Lab</label>
            <FilterableSelect
            // debug
                emptyText={emptyText}
                onChange={handleChange}
                value={value}
                filter={filter}
                onFilterChange={setFilter}
                options={(labs || []).map(lab => ({
                    value: lab.id,
                    label: lab.name,
                }))}
                loading={loading}
                clearable={clearable}
            />
        </>
    );
};
