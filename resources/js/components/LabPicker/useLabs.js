import { labsMapper } from '../../mappers/labs';
import {useApi} from '../../hooks/useApi';

export const useLabs = ({ filter, include }) => useApi(
    'labs',
    ({ get, toQueryString }) => get('/api/labs' + toQueryString({ filter, include })),
    labsMapper,
    [filter, include],
);
