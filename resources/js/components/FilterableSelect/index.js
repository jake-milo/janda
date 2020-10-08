import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import RoundClear from 'react-md-icon/dist/RoundClear';
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
    clearable = false,
}) => {
    const [open, setOpen] = useState(false);
    const [handle, setHandle] = useState(null);
    const ref = useRef();
    const clearButtonRef = useRef();

    useEffect(() => {
        if (disabled) {
            setOpen(false);
        }
    }, [disabled]);

    const handleSelectClick = (e) => {
        e.preventDefault();

        if (!ref.current.contains(e.target) && e.target !== clearButtonRef.current && !disabled) {
            setOpen(true);
        }
    };

    useOnClickOutside(ref, () => {
        setOpen(false);
    });

    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleOptionClick = id => (e) => {
        e.preventDefault();

        setOpen(false);
        onChange(id);
    };

    const handleClear = (e) => {
        e.preventDefault();

        onChange('');
    };

    const label = useMemo(() => {
        if (!value) return emptyText;

        const selected = options.find(op => op.value === value);

        return selected ? selected.label : '';
    }, [options, value, emptyText]);

    const [windowWidth, windowHeight] = useWindowSize();
    const position = useMemo(() => {
        if (!handle) return { top: 0, left: 0 };

        const box = handle.getBoundingClientRect();

        return {
            top: box.y + box.height,
            left: box.x,
            width: box.width,
        };
    // windowWidth & windowHeight aren't used in the dep,
    // but should trigger a reevaluation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handle, windowWidth, windowHeight]);

    return (
        <>
            <div className={`select ${disabled ? '--disabled' : ''} ${clearable ? '--clearable' : ''}`} onClick={handleSelectClick} ref={setHandle}>
                {clearable && value ? (
                    <div className="clear">
                        <button onClick={handleClear} ref={clearButtonRef} title="Clear">
                            <RoundClear style={{ pointerEvents: 'none' }} />
                        </button>
                    </div>
                ) : null}
                {label}

                {createPortal((
                    <div className={`select-popup ${open ? '' : '--hidden'}`} style={position} ref={ref}>
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
                                    <button key={value} onClick={handleOptionClick(value)}>
                                        {label}
                                    </button>
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
