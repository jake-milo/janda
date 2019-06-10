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
    // If creatingBrand changes we want the type
    // to change with it.
    useEffect(() => {
        setCreatingType(creatingBrand);
    }, [creatingBrand]);

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

            <PickOrNewType
                brandId={brand}
                name={typeName}
                value={type}
                onChange={handleTypeChange}
                creating={creatingType}
                onToggle={toggleTypeMode}
                allowToggle={!creatingBrand}
            />

            {creatingType && (
                <>
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
            )}
        </>
    );
};

PickOrNewContactLensBrandType.Formik = connect(PickOrNewContactLensBrandType);
