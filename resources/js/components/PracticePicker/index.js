import React from 'react';
import { usePractices } from './usePractices';

export const PracticePicker = ({ value, onChange, emptyText = 'Please Choose' }) => {
    const { practices } = usePractices();

    return (
        <>
            <label htmlFor="practice_id">Practice</label>
            <select name="practice_id" value={value} onChange={onChange}>
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
