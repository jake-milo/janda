import React from 'react';
import BaselineRemoveCircle from 'react-md-icon/dist/BaselineRemoveCircle';
import BaselineAddCircle from 'react-md-icon/dist/BaselineAddCircle';

import './Stepper.css';

export const Stepper = ({
    value,
    onChange,
    disabled,
    min = 0,
    buttonsOnly = false,
}) => {
    const handleChange = (e) => {
        const val = e.target.value;

        onChange(val);
    }

    const handleInc = (e) => {
        e.preventDefault();

        onChange(value + 1);
    }

    const handleDec = (e) => {
        e.preventDefault();

        const newVal = value - 1;
        onChange(newVal < min ? min : newVal);
    }

    return (
        <div className="stepper">
            <button onClick={handleDec} disabled={disabled}>
                <BaselineRemoveCircle />
            </button>

            {buttonsOnly ? (
                <p style={{ margin: '0 .5rem' }}>{value}</p>
            ) : (
                <input
                    type="number"
                    step={1}
                    min={min}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                />
            )}

            <button onClick={handleInc} disabled={disabled}>
                <BaselineAddCircle />
            </button>
        </div>
    );
};