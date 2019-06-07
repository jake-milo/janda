import React, { useState, useMemo } from 'react';
import { connect } from 'formik';
import { FilterableSelect } from '../FilterableSelect';
import { useTypes } from './useTypes';
import { useFiltered } from '../../hooks/useFiltered';

export const ContactLensTypePicker = ({
    brandId,
    name,
    value,
    onChange,
    formik,
    emptyText = 'Please Choose',
}) => {
    const [filter, setFilter] = useState('');
    const { types, loading } = useTypes({ brandId });

    const filteredTypes = useFiltered(
        types,
        filter,
        type => type.name,
    );

    const handleChange = (newVal) => {
        if (formik && formik.setFieldvalue) {
            formik.setFieldvalue(name, newVal);
        }

        if (onChange) {
            onChange(newVal);
        }
    };

    return (
        <>
            <label htmlFor={name} className={!brandId ? '--disabled' : ''}>
                Model
            </label>
            <FilterableSelect
                emptyText={emptyText}
                onChange={handleChange}
                value={value}
                filter={filter}
                onFilterChange={setFilter}
                options={filteredTypes.map(type => ({
                    value: type.id,
                    label: type.name,
                }))}
                loading={loading}
                disabled={!brandId}
            />
        </>
    );
};

ContactLensTypePicker.Formik = connect(ContactLensTypePicker);
