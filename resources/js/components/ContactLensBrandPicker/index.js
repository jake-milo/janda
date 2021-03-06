import React, { useState } from 'react';
import { FilterableSelect } from '../FilterableSelect';
import { useBrands } from './useBrands';
import { useDebounced } from '../../hooks/useDebounced';

export const ContactLensBrandPicker = ({
    name,
    value,
    emptyText = 'Please Choose',
    onChange,
    clearable,
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { brands, loading } = useBrands({ filter: debouncedFilter, include: value });

    const handleChange = (newVal) => {
        if (onChange) {
            onChange(newVal);
        }
    };

    return (
        <>
            <label htmlFor={name}>Brand</label>
            <FilterableSelect
                emptyText={emptyText}
                onChange={handleChange}
                value={value}
                filter={filter}
                onFilterChange={setFilter}
                options={(brands || []).map(brand => ({
                    value: brand.id,
                    label: brand.name,
                }))}
                loading={loading}
                clearable={clearable}
            />
        </>
    );
};
