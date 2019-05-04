import React, { useState } from 'react';
import { connect } from 'formik';
import { useLabs } from './useLabs';
import { FilterableSelect } from '../FilterableSelect';
import { useDebounced } from '../../hooks/useDebounced';

const BaseLabPicker = ({
    name,
    value,
    onChange,
    formik,
    emptyText = 'Please Choose',
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { labs, loading } = useLabs({ filter: debouncedFilter });

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
            <label htmlFor={name}>Lab</label>
            <FilterableSelect
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
            />
        </>
    );
};

export const LabPicker = connect(BaseLabPicker);
