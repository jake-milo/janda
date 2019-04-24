import React, { useMemo } from 'react';

export const Pagination = ({ page, totalPages, separator = '...' }) => {
    const items = useMemo(() => {
        const arr = [];

        if (totalPages <= 8) {
            for (let i = 1; i <= totalPages; i++) {
                arr.push(i);
            }
        } else {
            // Always show 1 and 2
            arr.push(1, 2);

            if (!arr.includes(page)) {
                // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA i dunno how pagination works
                if (page > 4) {
                    arr.push(separator, page - 1, page, page + 1);
                }

                // Add final pages
                if (page != totalPages && page != totalPages - 1) {
                    arr.push(separator, totalPages - 1, totalPages);
                }
            }
        }

        return arr;
    }, [page, totalPages, separator]);

    console.log(items);

    return (
        <div className="pagination">

        </div>
    );
};
