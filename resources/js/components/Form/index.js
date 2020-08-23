import React, { createContext, useContext, useMemo } from 'react';
import { Spinner } from '../Spinner';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormNew = ({ children, loading, values, onSubmit, errors }) => {
    const context = useMemo(() => ({ errors }), [errors]);
    
    return (
        <FormContext.Provider value={context}>
            {loading || !values ? (
                <Spinner />
            ) : null}

            {values && (
                <form onSubmit={onSubmit} style={{ display: loading ? 'none' : 'block' }}>
                    {children()}
                </form>
            )}
        </FormContext.Provider>
    );
};
