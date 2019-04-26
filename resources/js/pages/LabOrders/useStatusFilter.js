import { useState, useCallback, useMemo } from 'react';

export const useStatusFilter = () => {
    // All available statuses
    const statuses = useMemo(() => Object.entries({
        complete: 'Completed',
        incomplete: 'Incomplete',
        overdue: 'Overdue',
        urgent: 'Urgent',
    }), []);

    // Currently selected status
    const [status, setStatus] = useState('');

    // Change handler
    const handleStatusChange = useCallback((e) => {
        setStatus(e.target.value);
    }, []);

    // Return to the user
    return {
        status,
        statuses,
        handleStatusChange,
    };
};
