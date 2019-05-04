import { useState, useEffect } from 'react';

export const useDebounced = (value, delay) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return debounced;
};
