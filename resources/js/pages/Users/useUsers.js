import { useApi } from '../../hooks/useApi';
import { usersMapper } from '../../mappers/users';

export const useUsers = () => useApi(
    'users',
    ({ get }) => get('/api/users'),
    usersMapper,
);
