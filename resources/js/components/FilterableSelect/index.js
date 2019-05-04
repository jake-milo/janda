import React, { useState, useRef } from 'react';
import { Spinner } from '../Spinner';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export const FilterableSelect = ({ value, options, onChange, filter, onFilterChange, loading, emptyText }) => {
    const [popped, setPopped] = useState(false);
    const ref = useRef();

    const handleSelectClick = (e) => {
        e.preventDefault();

        if (!ref.current.contains(e.target)) {
            setPopped(true);
        }
    };

    useOnClickOutside(ref, () => {
        setPopped(false);
    });

    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleOptionClick = id => (e) => {
        e.preventDefault();

        setPopped(false);
        onChange(id);
    };

    const getLabel = () => value
        ? options.find(op => op.value === value).label
        : emptyText;

    return (
        <>
            <div className="select" onClick={handleSelectClick}>
                {getLabel()}

                <div className={`select-popup ${popped ? '' : '--hidden'}`} ref={ref}>
                    <input
                        type="search"
                        placeholder="Filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="filter"
                    />

                    {!loading ? (
                        <div className="options">
                            {options.map(({ value, label }) => (
                                <a
                                    href="#"
                                    key={value}
                                    onClick={handleOptionClick(value)}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>
        </>
    );
};
