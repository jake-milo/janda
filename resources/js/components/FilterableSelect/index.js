import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from '../Spinner';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useWindowSize } from '../../hooks/useWindowSize';

const selectRoot = document.getElementById('select-root');

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
    const [handle, setHandle] = useState(null);
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

    const [windowWidth, windowHeight] = useWindowSize();
    const position = useMemo(() => {
        if (!handle) return { top: 0, left: 0 };

        const box = handle.getBoundingClientRect();

        return {
            top: box.y + box.height,
            left: box.x,
            width: box.width,
        };
    }, [handle, windowWidth, windowHeight]);

    return (
        <>
            <div className={`select ${disabled ? '--disabled' : ''}`} onClick={handleSelectClick} ref={setHandle}>
                {getLabel()}

                {createPortal((
                    <div className={`select-popup ${popped ? '' : '--hidden'}`} style={position} ref={ref}>
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
                ), selectRoot)}
            </div>
        </>
    );
};
