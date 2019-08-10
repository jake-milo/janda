import React, { useState } from 'react';
import { useDebounced } from '../../hooks/useDebounced';
import { useManufacturers } from './useManufacturers';
import { FilterableSelect } from '../FilterableSelect';
import { connect } from 'formik';

export const ManufacturerPicker = ({
    name,
    value,
    formik,
    onChange,
    emptyText = 'Please Choose',
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { manufacturers, loading } = useManufacturers({ filter: debouncedFilter });

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

ManufacturerPicker.Formik = connect(ManufacturerPicker);
