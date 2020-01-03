import React, { useState, useMemo } from 'react';
import { connect } from 'formik';
import { useLabs } from './useLabs';
import { FilterableSelect } from '../FilterableSelect';
import { useDebounced } from '../../hooks/useDebounced';

export const LabPicker = ({
    name,
    value,
    onChange,
    formik,
    emptyText = 'Please Choose',
    allowEmpty = false,
}) => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { labs, loading } = useLabs({ filter: debouncedFilter, include: value ? value : null });

    const handleChange = (newVal) => {
        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, newVal);
        }

        if (onChange) {
            onChange(newVal);
        }
    };

    const options = useMemo(() => {
        let arr = [];

        if (allowEmpty && !filter) {
            arr.push({ value: '', label: emptyText });
        }

        if (labs) {
            arr = [
                ...arr,
                ...labs.map(lab => ({
                    value: lab.id,
                    label: lab.name,
                })),
            ];
        }

        return arr;
    }, [allowEmpty, filter, emptyText, labs]);

    return (
        <>
            <label htmlFor={name}>Lab</label>
            <FilterableSelect
                emptyText={emptyText}
                onChange={handleChange}
                value={value}
                filter={filter}
                onFilterChange={setFilter}
                options={options}
                loading={loading}
            />
        </>
    );
};

LabPicker.Formik = connect(LabPicker);
