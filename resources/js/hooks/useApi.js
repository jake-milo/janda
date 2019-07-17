import { useCallback, useState, useMemo, useEffect } from 'react';
import { get, toQueryString } from '../helpers';
import { usePageNumber } from '../hooks/usePageNumber';

const useApiCore = (key, fetcher, transformer, dependencies, page = null, setPage = null) => {
    // Memo the fetcher as a callback
    const fetch = useCallback(fetcher, dependencies);

    // State
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    // Memoize the transformed data
    const transformed = useMemo(
        () => response ? transformer(response.data) : null,
        [response, transformer],
    );

    // Memoize the page count
    const pageCount = useMemo(
        () => response && response.meta ? response.meta.last_page : null,
        [response],
    );

    useEffect(() => {
        setLoading(true);

        const args = { get, toQueryString };

        if (page) {
            args.page = page;
            args.resetPage = () => setPage(1);
        }

        const promise = fetch(args);

        if (promise) {
            promise.then(data => {
                setResponse(data);
                setLoading(false);
            });
        }
    }, [page, fetch, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        [key]: transformed,
        loading,
        page,
        pageCount,
        resetPage () {
            setPage(1);
        },
    };
};

export const useApi = (key, fetcher, transformer, dependencies = []) => {
    return useApiCore(key, fetcher, transformer, dependencies);
}

export const usePaginatedApi = (key, fetcher, transformer, dependencies = []) => {
    const { page, setPage } = usePageNumber();

    return useApiCore(
        key,
        fetcher,
        transformer,
        dependencies,
        page,
        setPage,
    );
};
