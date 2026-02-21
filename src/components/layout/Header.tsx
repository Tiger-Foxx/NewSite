import React from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { HeaderMobile } from './HeaderMobile';
import { HeaderDesktop } from './HeaderDesktop';

export const Header: React.FC = () => {
    const isMobile = useIsMobile(1024);

    if (isMobile) {
        return <HeaderMobile />;
    }

    return <HeaderDesktop />;
};
