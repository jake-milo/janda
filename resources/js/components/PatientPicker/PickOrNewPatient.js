import React, { useEffect, useState } from 'react';
import { PatientPicker } from './index';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundList from 'react-md-icon/dist/RoundList';

const initialCreatingValue = { title: '', name: '', last_name: '' };

export const PickOrNewPatient = ({ name, value, onChange, creating, setCreating }) => {
    const [creatingValue, setCreatingValue] = useState(initialCreatingValue);

    const handleChange = (val) => {
        if (onChange) {
            onChange(val);
        }
    };

    const toggleMode = (e) => {
        e.preventDefault();

        const newCreating = !creating;

        setCreating(newCreating);

        if (newCreating) {
            setCreatingValue(initialCreatingValue);
        } else {
            onChange('');
        }
    };

    const handleTextChange = (key) => (e) => {
        const val = e.target.value;

        setCreatingValue(prev => ({
            ...prev,
            [key]: val,
        }));
    };

    useEffect(() => {
        if (creating) {
            onChange(creatingValue);
        }
    }, [creating, creatingValue]);

    return (
        <>
            <div className={creating ? 'input-wrapper --create' : 'select-wrapper --create'}>
                {creating ? (
                    <>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={creatingValue.title}
                            onChange={handleTextChange('title')}
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
                    href="#toggle"
                    className="create"
                    title={creating ? 'Pick Existing Patient' : 'Create New Patient'}
                    onClick={toggleMode}
                >
                    {creating ? <RoundList /> : <RoundAdd />}
                </a>
            </div>

            {creating ? (
                <>
                    <div className="input-chain" />

                    <div className="input-wrapper --create">
                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            name="name"
                            value={creatingValue.name}
                            onChange={handleTextChange('name')}
                        />
                    </div>

                    <div className="input-chain" />

                    <div className="input-wrapper --create">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={creatingValue.last_name}
                            onChange={handleTextChange('last_name')}
                        />
                    </div>
                </>
            ) : null}
        </>
    );
}
