import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Page.css';

export const Page = ({ children }) => (
    <div className="page">
        {children}
    </div>
);

export const TabbedPage = ({ tabs, links, defaultTab }) => {
    const keys = Object.keys(tabs);
    const [activeTab, setActiveTab] = useState(defaultTab || keys[0]);

    const handleTabClick = (tab) => (e) => {
        e.preventDefault();

        setActiveTab(tab);
    };

    return (
        <>
            <div className="tabs">
                {keys.map(key => links ? (
                    <NavLink to={links[key]} activeClassName="--active" key={key}>
                        {key}
                    </NavLink>
                ) : (
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
                {links
                    ? keys.map(key => {
                        const path = links[key];

                        return (
                            <React.Fragment key={path}>
                                {tabs[key](path)}
                            </React.Fragment>
                        );
                    })
                    : tabs[activeTab]()}
            </Page>
        </>
    );
};
