import { labsMapper } from '../../mappers/labs';
import {useApi} from '../../hooks/useApi';

export const useLabs = () => useApi(
    'labs',
    ({ get }) => get('/api/labs'),
    labsMapper,
);
