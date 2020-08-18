import React from 'react';
import { PickOrNewBrand } from './PickOrNewBrand';
import { PickOrNewType } from './PickOrNewType';
import { FieldError, FieldErrorNew } from '../FieldError';

export const PickOrNewContactLensBrandType = ({
    brandName,
    typeName,
    durationName,
    brand,
    type,
    duration,
    formik,
    onBrandChange,
    onTypeChange,
    onDurationChange,
    creatingBrand,
    setCreatingBrand,
    creatingType,
    setCreatingType,
}) => {
    const toggleBrandMode = () => {
        onBrandChange('');
        if (!creatingType || creatingBrand) {
            onTypeChange('');
            onDurationChange('');
        }
        setCreatingBrand(!creatingBrand);
    };

    const toggleTypeMode = () => {
        onTypeChange('');
        onDurationChange('');
        setCreatingType(!creatingType);
    };

    return (
        <>
            <PickOrNewBrand
                name={brandName}
                value={brand}
                onChange={onBrandChange}
                creating={creatingBrand}
                onToggle={toggleBrandMode}
            />

            <div className="input-chain" />

            <PickOrNewType
                brandId={brand}
                name={typeName}
                value={type}
                onChange={onTypeChange}
                creating={creatingType || creatingBrand}
                onToggle={toggleTypeMode}
                allowToggle={!creatingBrand}
            />

            {creatingType || creatingBrand ? (
                <>
                    <div className="input-chain" />

                    <div className="input-wrapper">
                        <label htmlFor={durationName}>Duration</label>
                        <input
                            type="text"
                            id={durationName}
                            name={durationName}
                            value={duration}
                            onChange={e => onDurationChange(e.target.value)}
                        />
                    </div>
                    <FieldErrorNew name={durationName} />
                </>
            ) : null}
        </>
    );
};
