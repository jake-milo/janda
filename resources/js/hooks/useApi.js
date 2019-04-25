import { useCallback, useState, useMemo, useEffect } from 'react';
import { get } from '../helpers';
import { usePageNumber } from '../hooks/usePageNumber';

export const useApi = (key, fetcher, transformer, dependencies = []) => {
    const page = usePageNumber();

    const fetch = useCallback(fetcher, [...dependencies]);

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const transformed = useMemo(
        () => response ? transformer(response.data) : null,
        [response, transformer],
    );

    const pageCount = useMemo(
        () => response && response.meta ? response.meta.last_page : null,
        [response],
    );

    useEffect(() => {
        setLoading(true);

        fetch({ page, get })
            .then(data => {
                setResponse(data);
                setLoading(false);
            });
    }, [page, fetch, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        [key]: transformed,
        loading,
        page,
        pageCount,
    };
};
