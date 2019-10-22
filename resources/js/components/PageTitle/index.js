import React from 'react';

import './PageTitle.css';

export const PageTitle = ({ children, small = false }) => (
    <h1 className={`page-title ${small ? '--small' : ''}`}>{children}</h1>
);
