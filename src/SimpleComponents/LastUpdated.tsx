import * as React from 'react';

const style = {
    fontSize: '12px',
};

const time = '2/07/2026 5:33pm';
const lastUpdatedString = `Last updated:\u00A0\u00A0\u00A0${time}`;

const LastUpdated: React.FC = () => {
    return <div style={style}>{lastUpdatedString}</div>;
};

export default LastUpdated;
