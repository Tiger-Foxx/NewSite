import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import HomeMobile from './HomeMobile';
import HomeDesktop from './HomeDesktop';

export const HomePage: React.FC = () => {
    const isMobile = useIsMobile(1024); // 1024px break point for desktop vs mobile

    if (isMobile) {
        return <HomeMobile />;
    }

    return <HomeDesktop />;
};

export default HomePage;
