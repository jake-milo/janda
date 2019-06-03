import { labsMapper } from '../../mappers/labs';
import {useApi} from '../../hooks/useApi';

export const useLabs = ({ filter }) => useApi(
    'labs',
    ({ get, toQueryString }) => get('/api/labs' + toQueryString({ filter })),
    labsMapper,
    [filter],
);
