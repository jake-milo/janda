import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import RoundClear from 'react-md-icon/dist/RoundClear';
import { Spinner } from '../Spinner';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useBoundingBox } from '../../hooks/useBoundingBox';

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

    useOnClickOutside([handle, ref], () => {
        setOpen(false);
    });

    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleOptionClick = id => (e) => {
        e.preventDefault();

        onChange(id);
        setOpen(false);
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

    const [boundingBox, reloadBoundingBox] = useBoundingBox(handle);

    const position = useMemo(() => {
        if (!boundingBox) return { top: 0, left: 0 };

        const { y, height, x, width } = boundingBox;

        return {
            top: y + height,
            left: x,
            width,
        };
    // windowWidth & windowHeight aren't used in the dep,
    // but should trigger a reevaluation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boundingBox, windowWidth, windowHeight]);

    const handleSelectClick = (e) => {
        e.preventDefault();

        // cancel if disabled
        if (disabled) return;

        // or we clicked an item in the list
        if (ref.current.contains(e.target)) return;

        // or we clicked the clear button
        if (clearButtonRef.current && clearButtonRef.current.contains(e.target)) return;

        // ensure the bounding box is up to date
        reloadBoundingBox();

        // otherwise we're good to open
        setOpen(true);
    };

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
