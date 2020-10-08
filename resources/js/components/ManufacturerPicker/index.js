import React, { useState } from 'react';
import { useDebounced } from '../../hooks/useDebounced';
import { useManufacturers } from './useManufacturers';
import { FilterableSelect } from '../FilterableSelect';

export const ManufacturerPicker = ({
    name,
    value,
    onChange,
    emptyText = 'Please Choose',
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { manufacturers, loading } = useManufacturers({ filter: debouncedFilter });

    const handleChange = (newVal) => {
        if (onChange) {
            onChange(newVal);
        }
    };

    return (
        <>
            <label htmlFor={name}>Manufacturer</label>
            <FilterableSelect
                emptyText={emptyText}
                onChange={handleChange}
                value={value}
                filter={filter}
                onFilterChange={setFilter}
                options={(manufacturers || []).map(manufacturer => ({
                    value: manufacturer.id,
                    label: manufacturer.name,
                }))}
                loading={loading}
                debug
            />
        </>
    );
}
