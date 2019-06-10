import React from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundList from 'react-md-icon/dist/RoundList';
import { ContactLensTypePicker } from '../ContactLensTypePicker';
import { FieldError } from '../FieldError';

export const PickOrNewType = ({
    name,
    value,
    onChange,
    creating,
    onToggle,
    brandId,
    allowToggle,
}) => {
    const onToggleClick = (e) => {
        e.preventDefault();

        onToggle();
    };

    const className = creating
        ? `input-wrapper ${allowToggle ? '--create' : ''}`
        : 'select-wrapper --create';

    return (
        <>
            <div className={className}>
                {creating ? (
                    <>
                        <label htmlFor={name}>Model</label>
                        <input
                            type="text"
                            name={name}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                        />
                    </>
                ) : (
                    <ContactLensTypePicker
                        brandId={brandId}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                )}

                {allowToggle && (
                    <a
                        href="#"
                        className="create"
                        title={creating ? 'Pick Existing Model' : 'Create New Model'}
                        onClick={onToggleClick}
                    >
                        {creating ? <RoundList /> : <RoundAdd />}
                    </a>
                )}
            </div>
            <FieldError name={name} />
        </>
    );
};
