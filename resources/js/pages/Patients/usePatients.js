import { useState, useEffect, useMemo } from 'react';
import { get } from '../../helpers';
import { patientMapper } from './patientMapper';

const mapOrNull = response => response ? patientMapper(response.data) : null;

export const usePatients = () => {
    const [response, setResponse] = useState(null);
    const patients = useMemo(() => mapOrNull(response), [
        (response || {}).data,
    ]);

    useEffect(() => {
        get('/api/patients')
            .then(data => {
                setResponse(data);
            })
    }, []);

    return { patients };
};
