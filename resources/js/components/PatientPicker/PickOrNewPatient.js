import React from 'react';
import { PatientPicker } from './index';
import { connect } from 'formik';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundList from 'react-md-icon/dist/RoundList';

export const PickOrNewPatient = ({ name, value, formik, onChange, creating, setCreating }) => {
    const handleChange = (val) => {
        if (formik && formik.setFieldValue) {
            formik.setFieldValue(name, val);
        }

        if (onChange) {
            onChange(val);
        }
    };

    const toggleMode = (e) => {
        e.preventDefault();
        handleChange('');
        setCreating(!creating);
    };

    return (
        <div className={creating ? 'input-wrapper --create' : 'select-wrapper --create'}>
            {creating ? (
                <>
                    <label htmlFor={name}>Patient</label>
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={e => handleChange(e.target.value)}
                    />
                </>
            ) : (
                <PatientPicker
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
            )}
            <a
                href="#"
                className="create"
                title={creating ? 'Pick Existing Patient' : 'Create New Patient'}
                onClick={toggleMode}
            >
                {creating ? <RoundList /> : <RoundAdd />}
            </a>
        </div>
    );
}

PickOrNewPatient.Formik = connect(PickOrNewPatient);
