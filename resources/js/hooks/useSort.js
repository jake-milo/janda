import { useState } from 'react';

export const useSort = () => {
    const [sort, setSort] = useState(null);
    const [order, setOrder] = useState(null);

    const update = (newSort) => {
        if (newSort === sort) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSort(newSort);
            setOrder('desc');
        }
    };

    return [sort, order, update];
};
