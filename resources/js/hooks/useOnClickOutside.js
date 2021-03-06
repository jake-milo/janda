import { useEffect } from 'react';

export const toEl = (ref) => ref instanceof HTMLElement || !ref ? ref : ref.current;

// converts a single ref, element or array into
// an array of corresponding elements
export const toEls = (refsOrRef) => {
    const refs = Array.isArray(refsOrRef) ? refsOrRef : [refsOrRef];

    return refs.map(toEl);
};

// `ref` is either a single ref, element or an array of either
export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const els = toEls(ref);

        const handleClick = (e) => {
            const contained = els.some(el => {
                return el && el.contains(e.target);
            });

            if (!contained) {
                handler(e);
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref]);
};
