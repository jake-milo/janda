import React, { useMemo } from 'react';

export const StatusPicker = ({ value, onChange }) => {
    const statuses = useMemo(() => Object.entries({
        complete: 'Completed',
        incomplete: 'Incomplete',
        overdue: 'Overdue',
        urgent: 'Urgent',
    }), []);

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <>
            <label htmlFor="status">Status</label>
            <select value={value} onChange={handleChange}>
                <option value="">All</option>
                {statuses.map(([val, label]) => (
                    <option key={val} value={val}>
                        {label}
                    </option>
                ))}
            </select>
        </>
    );
};
