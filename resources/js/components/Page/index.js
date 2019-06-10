import React, { useState } from 'react';

import './Page.css';

export const Page = ({ children }) => (
    <div className="page">
        {children}
    </div>
);

export const TabbedPage = ({ tabs, defaultTab }) => {
    const keys = Object.keys(tabs);
    const [activeTab, setActiveTab] = useState(defaultTab || keys[0]);

    const handleTabClick = (tab) => (e) => {
        e.preventDefault();

        setActiveTab(tab);
    };

    return (
        <>
            <div className="tabs">
                {keys.map(key => (
                    <a
                        key={key}
                        href={`#${key.toLowerCase()}`}
                        onClick={handleTabClick(key)}
                        className={key === activeTab ? '--active' : ''}
                    >
                        {key}
                    </a>
                ))}
            </div>

            <Page>
                {tabs[activeTab]()}
            </Page>
        </>
    );
};
