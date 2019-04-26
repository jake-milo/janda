import { useState, useCallback } from 'react';
import { useApi } from './useApi';
import { practicesMapper } from '../mappers/practices';

export const usePracticeFilter = () => {
    const getPractices = ({ get }) => get('/api/practices');
    const { practices } = useApi('practices', getPractices, practicesMapper);

    const [practice, setPractice] = useState('');

    const handlePracticeChange = useCallback((e) => {
        setPractice(e.target.value);
    }, []);

    return {
        practice,
        practices: practices || [],
        handlePracticeChange,
    };
};
