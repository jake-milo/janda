import { timeMapper } from './time';

export const userMapper = ({ time, ...rest }) => {
    const user = { ...rest };

    user.time = timeMapper(time);

    return user;
};

export const usersMapper = users => users.map(u => userMapper(u));
