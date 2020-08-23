import React, { useState } from 'react';
import { connect } from 'formik';
import { FilterableSelect } from '../FilterableSelect';
import { useBrands } from './useBrands';
import { useDebounced } from '../../hooks/useDebounced';

export const ContactLensBrandPicker = ({
    name,
    value,
    formik,
    emptyText = 'Please Choose',
    onChange,
    clearable,
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { brands, loading } = useBrands({ filter: debouncedFilter });

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

ContactLensBrandPicker.Formik = connect(ContactLensBrandPicker);
