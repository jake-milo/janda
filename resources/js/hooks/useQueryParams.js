import qs from 'query-string';
import { useLocation } from './useRouter';

export const useQueryParams = () => {
    const { search } = useLocation();

    return qs.parse(search);
};
