import { useState } from 'react';

export const useLabFilter = () => {
    const [lab, setLab] = useState('');

    const handleLabChange = (e) => {
        setLab(e.target.value);
    };

    return {
        lab,
        handleLabChange,
    };
};
