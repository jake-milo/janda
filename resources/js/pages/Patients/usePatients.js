import { useState, useEffect, useMemo } from 'react';
import { get } from '../../helpers';
import { patientMapper } from './patientMapper';

const mapOrNull = response => response ? patientMapper(response.data) : null;

const getPageNum = (search) => {
    if (search) {
        const params = new URLSearchParams(search);
        const p = params.get('page') || 1;

        return parseInt(p, 10);
    }

    return 1;
};

export const usePatients = (search) => {
    const page = useMemo(() => getPageNum(search), [search]);

    const [response, setResponse] = useState(null);

    const patients = useMemo(
        () => mapOrNull(response),
        [response ? response.data : null],
    );

    const pageCount = useMemo(
        () => response ? response.meta.last_page : null,
        [response ? response.meta : null],
    );

    useEffect(() => {
        get(`/api/patients?page=${page}`)
            .then(data => {
                setResponse(data);
            })
    }, [page]);

    return { patients, page, pageCount };
};
