import * as React from 'react';

const MOBILE_LIMIT = 575;
const COMPRESSED_LIMIT = 1100;

export function useWindowWidth() {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile: width <= MOBILE_LIMIT,
        isSmallScreen: width > MOBILE_LIMIT && width <= COMPRESSED_LIMIT,
        isFullScreen: width > COMPRESSED_LIMIT,
    };
}
