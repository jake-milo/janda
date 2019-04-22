import { useMemo } from 'react';
import qs from 'query-string';
import { useLocation } from './useRouter';

export const usePageNumber = () => {
    const { search } = useLocation();

    return useMemo(() => {
        const parsed = qs.parse(search || '');

        return parsed.page || 1;
    }, [search]);
};
