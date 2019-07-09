import React, { useState, useRef, useEffect } from 'react';
import { Spinner } from '../Spinner';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export const FilterableSelect = ({
    value,
    options,
    onChange,
    filter,
    onFilterChange,
    loading,
    emptyText,
    disabled = false,
}) => {
    const [popped, setPopped] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (disabled && popped) {
            setPopped(false);
        }
    }, [disabled]);

    const handleSelectClick = (e) => {
        e.preventDefault();

        if (!ref.current.contains(e.target) && !disabled) {
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

    const getLabel = () => {
        if (!value) return emptyText;

        const selected = options.find(op => op.value === value);
        return selected ? selected.label : '';
    }

    return (
        <>
            <div className={`select ${disabled ? '--disabled' : ''}`} onClick={handleSelectClick}>
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
