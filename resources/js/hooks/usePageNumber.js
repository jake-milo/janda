import { useMemo } from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from './useRouter';

export const usePageNumber = () => {
    const { search, pathname } = useLocation();
    const history = useHistory();

    const params = qs.parse(search);
    const page = parseInt(params.page, 10) || 1;

    const setPage = (number) => {
        history.push({
            pathname,
            search: '?' + qs.stringify({
                ...params,
                page: 1,
            }),
        });
    };

    return { page, setPage };

    return useMemo(() => {
        const parsed = qs.parse(search);

        return parseInt(parsed.page, 10) || 1;
    }, [search]);
};
