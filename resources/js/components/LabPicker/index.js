import React from 'react';
import { useLabs } from './useLabs';

export const LabPicker = ({value, onChange, emptyText = 'Please Choose' }) => {
    const { labs } = useLabs();

    return (
        <>
            <label htmlFor="lab_id">Lab</label>
            <select name="lab_id" value={value} onChange={onChange}>
                <option value="">{emptyText}</option>
                {(labs || []).map(lab => (
                    <option value={lab.id} key={lab.id}>
                        {lab.name}
                    </option>
                ))}
            </select>
        </>
    );
}
