import { useMemo } from 'react';

const strip = str => str.toLowerCase().replace(/ +/g, '');

export const useFiltered = (items, filter, getTerm) => {
    const strippedFilter = useMemo(
        () => strip(filter),
        [filter],
    );

    return useMemo(() => {
        if (!items) return [];

        return items.filter(item => (
            strip(getTerm(item)).includes(strippedFilter)
        ));
    }, [items, filter])
};
