import qs from 'query-string';
import { useLocation, useHistory } from './useRouter';

export const usePageNumber = () => {
    const { search, pathname } = useLocation();
    const history = useHistory();

    const params = qs.parse(search);
    const page = parseInt(params.page, 10) || 1;

    const setPage = (number = 1) => {
        history.push({
            pathname,
            search: '?' + qs.stringify({
                ...params,
                page: number,
            }),
        });
    };

    return { page, setPage };
};
