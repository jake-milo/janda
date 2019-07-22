import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const el = ref instanceof HTMLElement || !ref
            ? ref
            : ref.current;

        const handleClick = (e) => {
            if (el && !el.contains(e.target)) {
                handler(e);
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    });
};
