import React from 'react';
import { usePractices } from './usePractices';

export const PracticePicker = ({
    value,
    onChange,
    name = 'practice_id',
    emptyText = 'Please Choose',
}) => {
    const { practices } = usePractices();

    const handleChange = (e) => {
        const val = e.target.value && parseInt(e.target.value, 10);

        if (onChange) {
            onChange(val);
        }
    };

    return (
        <>
            <label htmlFor={name}>Practice</label>
            <select name={name} value={value} onChange={handleChange}>
                <option value="">{emptyText}</option>
                {(practices || []).map(practice => (
                    <option value={practice.id} key={practice.id}>
                        {practice.name}
                    </option>
                ))}
            </select>
        </>
    );
}
