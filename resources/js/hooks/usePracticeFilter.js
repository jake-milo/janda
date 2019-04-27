import { useState } from 'react';

export const usePracticeFilter = () => {
    const [practice, setPractice] = useState('');

    const handlePracticeChange = (e) => {
        setPractice(e.target.value);
    };

    return {
        practice,
        handlePracticeChange,
    };
};
