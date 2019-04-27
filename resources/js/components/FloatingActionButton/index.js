import React from 'react';

import './FloatingActionButton.css';

export const FloatingActionButton = ({ children, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();

        onClick();
    };

    return (
        <a href="#" onClick={handleClick} className="fab">
            {children}
        </a>
    );
};
