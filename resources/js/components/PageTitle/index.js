import React from 'react';

import './PageTitle.css';

export const PageTitle = ({ children, small = false, label = false }) => (
    <>
        {label ? <h2 className="sub-header">{label}</h2> : null}
        <h1 className={`page-title ${small ? '--small' : ''}`}>{children}</h1>
    </>
);
