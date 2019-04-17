import { useState, useEffect } from 'react';
import { get } from '../../helpers';

export const usePatients = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        get('/api/patients')
            .then(data => {
                setResponse(data);
            })
    }, []);

    return {
        patients: response ? response.data : null,
    };
};
