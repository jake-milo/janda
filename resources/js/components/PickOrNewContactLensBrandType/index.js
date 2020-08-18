import React, { useEffect } from 'react';
import { connect } from 'formik';
import { PickOrNewBrand } from './PickOrNewBrand';
import { PickOrNewType } from './PickOrNewType';
import { FieldError } from '../FieldError';

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
    const handleChange = (name, cb) => (val) => {
        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, val);
        }

        if (cb) cb(val);
    }

    const handleBrandChange = handleChange(brandName, onBrandChange);
    const handleTypeChange = handleChange(typeName, onTypeChange);
    const handleDurationChange = handleChange(durationName, onDurationChange);

    const toggleBrandMode = () => {
        handleBrandChange('');
        if (!creatingType || creatingBrand) {
            handleTypeChange('');
            handleDurationChange('');
        }
        setCreatingBrand(!creatingBrand);
    };

    const toggleTypeMode = () => {
        handleTypeChange('');
        handleDurationChange('');
        setCreatingType(!creatingType);
    };

    return (
        <>
            <PickOrNewBrand
                name={brandName}
                value={brand}
                onChange={handleBrandChange}
                creating={creatingBrand}
                onToggle={toggleBrandMode}
            />

            <div className="input-chain" />

            <PickOrNewType
                brandId={brand}
                name={typeName}
                value={type}
                onChange={handleTypeChange}
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
                            onChange={e => handleDurationChange(e.target.value)}
                        />
                    </div>
                    <FieldError name={durationName} />
                </>
            ) : null}
        </>
    );
};

PickOrNewContactLensBrandType.Formik = connect(PickOrNewContactLensBrandType);
