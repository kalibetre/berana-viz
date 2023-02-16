import { useEffect, useState } from 'react';
import { Size } from '../types';

const useWindowResize = () => {
    const [size, setSize] = useState<Size>();

    const handleResize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [size]);

    return size;
};

export default useWindowResize;
