import { timeMapper } from './time';

export const labMapper = ({ time, ...rest }) => {
    const lab = { ...rest };

    lab.time = timeMapper(time);

    return lab;
};

export const labsMapper = labs => labs.map(l => labMapper(l));
