import { useState, useEffect, useMemo } from 'react';
import { get } from '../../helpers';
import { patientMapper } from './patientMapper';

const transformOrNull = res => res ? patientMapper(res.data) : null;

export const usePatient = (id) => {
    const [response, setResponse] = useState(null);
    const patient = useMemo(() => transformOrNull(response), [
        (response || {}).data,
    ]);

    useEffect(() => {
        get(`/api/patients/${id}`)
            .then(data => {
                setResponse(data);
            });
    }, [id]);

    return { patient };
};
