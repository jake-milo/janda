import { useRef, useEffect } from 'react';

export const usePrev = (...params) => {
    const prev = useRef(params);

    useEffect(() => {
        prev.current = params;
    }, params); // eslint-disable-line react-hooks/exhaustive-deps

    return [params, prev.current];
}
