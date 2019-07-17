import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = (e) => {
            setWidth(e.target.innerWidth);
            setHeight(e.target.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [width, height];
};
