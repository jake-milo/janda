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
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { brands, loading } = useBrands({ filter: debouncedFilter });

    const handleChange = (newVal) => {
        formik.setFieldValue(name, newVal);
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
            />
        </>
    );
};

ContactLensBrandPicker.Formik = connect(ContactLensBrandPicker);

