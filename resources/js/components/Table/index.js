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
        <table className="table">
            <thead>
                <tr>
                    {names.map((name, i) => (
                        <th key={name} className={`--${sizes[i]}`}>
                            {name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    );
};

export const Row = ({ children }) => <tr>{children}</tr>;

export const Cell = ({ children }) => <td>{children}</td>;
