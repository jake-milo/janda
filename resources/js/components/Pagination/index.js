import React from 'react';
import { Link } from 'react-router-dom';

import { usePagination } from './usePagination';

import './Pagination.css';

export const Pagination = ({ page, totalPages, urlFormat, separator = '⋯' }) => {
    const items = usePagination(page, totalPages, separator, urlFormat);

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return totalPages !== 1 ? (
        <div className="pagination">
            <ul>
                {items.map(({ item, key, link, isSeparator, isCurrent }) => (
                    <li key={key}>
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
