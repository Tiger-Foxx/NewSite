import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Only run on client
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobile(window.innerWidth < breakpoint);
            };

            // Set initial value
            handleResize();

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [breakpoint]);

    return isMobile;
};
