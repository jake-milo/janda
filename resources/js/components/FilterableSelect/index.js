import React, { useState, useMemo } from 'react';
import { Spinner } from '../Spinner';

export const FilterableSelect = ({ name, value, options, onChange, filter, onFilterChange, getLabel, getIdentifier, loading }) => {
    const [popped, setPopped] = useState(false);

    console.log({ value, label: getLabel(value) });

    const handleSelectClick = (e) => {
        e.preventDefault();

        setPopped(true);
    };

    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleOptionClick = id => (e) => {
        e.preventDefault();

        console.log(id);

        onChange(e);
        setPopped(false);
    };

    return (
        <>
            <div className="select" onClick={handleSelectClick}>
                {getLabel(value)}

                <div className={`select-popup ${popped ? '' : '--hidden'}`}>
                    <input
                        type="search"
                        placeholder="Filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="filter"
                    />

                    {!loading ? (
                        <div className="options">
                            {options.map((option) => {
                                const id = getIdentifier(option);
                                const label = getLabel(id);

                                return (
                                    <a
                                        name={name}
                                        href="#"
                                        key={id}
                                        onClick={handleOptionClick(id)}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>
        </>
    );
};
