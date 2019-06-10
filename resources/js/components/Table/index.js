import React, { useState, useEffect } from 'react';

import './Table.css';

export const Table = ({ headers, children }) => {
    const [names, setNames] = useState([]);
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        const mapped = Object.entries(headers)
            .reduce((acc, [name, size]) => {
                acc[0].push(name);
                acc[1].push(size);

                return acc;
            }, [[], []]);

        setNames(mapped[0]);
        setSizes(mapped[1]);
    }, [headers]);

    return (
        <div className="table">
            <Row header>
                {names.map((name, i) => (
                    <Cell key={name} size={sizes[i]} header>
                        {name}
                    </Cell>
                ))}
            </Row>

            {children}
        </div>
    );
};

export const Row = ({ children, header = false, classes = [], }) => (
    <div className={`row ${header ? '--header' : ''} ${classes.join(' ')}`}>
        {children}
    </div>
);

export const Cell = ({ children, size = 'normal', header = false, when = true }) => when ? (
    <div className={`cell --${size} ${header ? '--header' : ''}`}>
        {children}
    </div>
) : null;
