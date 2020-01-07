import { useMemo } from 'react';

export const usePagination = (page, totalPages, separator, urlFormat, delta = 1) => useMemo(() => {
    const left = page - delta;
    const right = page + delta + 1;
    const range = [];
    const rangeWithSeparators = [];

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i < right)) {
            range.push(i);
        }
    }

    let last;
    range.forEach((item) => {
        if (last) {
            if (item - last === 2) {
                rangeWithSeparators.push(last + 1);
            } else if (item - last !== 1) {
                rangeWithSeparators.push(separator);
            }
        }

        rangeWithSeparators.push(item);
        last = item;
    });

    return rangeWithSeparators.map((item, i) => ({
        item,
        key: item === separator ? `${separator}-${i}`: item,
        link: urlFormat.replace(/:page:/, item),
        isSeparator: item === separator,
        isCurrent: item === page,
    }));
}, [page, totalPages, separator, urlFormat, delta]);
