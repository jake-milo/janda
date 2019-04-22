import { useState, useMemo, useEffect } from 'react';
import { get } from '../helpers';
import { usePageNumber } from '../hooks/usePageNumber';

export const useApi = (key, fetch, transformer, dependencies = []) => {
    const page = usePageNumber();

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const transformed = useMemo(
        () => response ? transformer(response.data) : null,
        [response ? response.data : null],
    );

    const pageCount = useMemo(
        () => response && response.meta ? response.meta.last_page : null,
        [response ? response.meta : null],
    );

    useEffect(() => {
        setLoading(true);

        fetch({ page, get })
            .then(data => {
                setResponse(data);
                setLoading(false);
            });
    }, [page, ...dependencies]);

    return {
        [key]: transformed,
        loading,
        page,
        pageCount,
    };
};
