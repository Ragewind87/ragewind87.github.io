import * as React from 'react';

export const lastUpdatedString = `Last updated:\u00A0\u00A0\u00A02/04/2026 12:39am`;

const style = {
    fontSize: '12px',
};

const LastUpdated: React.FC = () => {
    return <div style={style}>{lastUpdatedString}</div>;
};

export default LastUpdated;
