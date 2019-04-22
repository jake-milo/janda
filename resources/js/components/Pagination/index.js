import React from 'react';
import { Link } from 'react-router-dom';

import { usePagination } from './usePagination';

import './Pagination.css';

export const Pagination = ({ page, totalPages, toUrl, separator = '⋯' }) => {
    const items = usePagination(page, totalPages, separator, toUrl);

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return totalPages !== 1 ? (
        <div className="pagination">
            <ul>
                {items.map(({ item, link, isSeparator, isCurrent }) => (
                    <li key={item}>
                        {isSeparator ? separator : (
                            <Link
                                className={isCurrent ? '--current' : ''}
                                onClick={handleLinkClick}
                                to={link}
                            >
                                {item}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    ) : null;
};
