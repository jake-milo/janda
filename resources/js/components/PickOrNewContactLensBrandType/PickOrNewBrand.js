import React from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundList from 'react-md-icon/dist/RoundList';
import { ContactLensBrandPicker } from '../ContactLensBrandPicker';
import { FieldError } from '../FieldError';

export const PickOrNewBrand = ({ name, value, onChange, creating, onToggle }) => {
    const onToggleClick = (e) => {
        e.preventDefault();

        onToggle();
    };

    return (
        <>
            <div className={creating ? 'input-wrapper --create' : 'select-wrapper --create'}>
                {creating ? (
                    <>
                        <label htmlFor={name}>Brand</label>
                        <input
                            type="text"
                            name={name}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                        />
                    </>
                ) : (
                    <ContactLensBrandPicker
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                )}
                <a
                    href="#create"
                    className="create"
                    title={creating ? 'Pick Existing Brand' : 'Create New Brand'}
                    onClick={onToggleClick}
                >
                    {creating ? <RoundList /> : <RoundAdd />}
                </a>
            </div>
            <FieldError name={name} />
        </>
    );
};
