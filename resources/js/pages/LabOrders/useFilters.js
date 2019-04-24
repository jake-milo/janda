import { useState, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { practicesMapper } from '../../mappers/practices';

export const useFilters = () => {
    const getPractices = ({ get }) => get('/api/practices');
    const { practices } = useApi('practices', getPractices, practicesMapper);

    const [practice, setPractice] = useState('');

    const handlePracticeChange = useCallback((e) => {
        setPractice(e.target.value);
    }, []);

    return {
        practice,
        practices: practices ? practices.map(p => ({
            id: p.id,
            name: p.name
        })) : [],
        handlePracticeChange,
    };
};
