import React, { useState, useEffect } from 'react';
import RoundUp from 'react-md-icon/dist/RoundKeyboardArrowUp';
import RoundDown from 'react-md-icon/dist/RoundKeyboardArrowDown';

import './Table.css';

export const Table = ({ headers, children, sortable, sort, order, updateSorting, constrained = false }) => {
    const [names, setNames] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [centered, setCentered] = useState([]);

    useEffect(() => {
        const mapped = Object.entries(headers)
            .reduce((acc, [name, size]) => {
                let centered = false;

                if (Array.isArray(size)) {
                    [size, centered] = size;
                }

                acc[0].push(name);
                acc[1].push(size);
                acc[2].push(centered);

                return acc;
            }, [[], [], []]);

        setNames(mapped[0]);
        setSizes(mapped[1]);
        setCentered(mapped[2]);
    }, [headers]);

    const handleHeaderClick = (name) => () => {
        updateSorting(name);
    };

    return (
        <div className={`table ${constrained ? '--constrained' : ''}`}>
            <Row header>
                {names.map((name, i) => (
                    <Cell
                        key={name}
                        size={sizes[i]}
                        header
                        onClick={sortable && sortable[name] ? handleHeaderClick(sortable[name]) : null}
                        centered={centered[i]}
                    >
                        {sortable && sortable[name] && sort === sortable[name] ? (
                            order === 'desc' ? <RoundDown /> : <RoundUp />
                        ) : null}

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

export const Cell = ({
    children,
    size = 'normal',
    header = false,
    when = true,
    centered = false,
    onClick = null,
}) => {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    const classes = [
        'cell',
        `--${size}`,
        header ? '--header' : '',
        centered ? '--centered' : '',
        onClick ? '--clickable' : '',
    ].join(' ');

    return when ? (
        <div className={classes} onClick={handleClick}>
            {children}
        </div>
    ) : null;
}
