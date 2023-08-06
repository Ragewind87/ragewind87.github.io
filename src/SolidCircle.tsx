import React from 'react';

export interface ISvgProps {
    fill: string
    borderColor?: string
}

export const SolidCircle: React.FunctionComponent<ISvgProps> = (props) => {

    return (
        <svg
            height="100%" 
            width="100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="50" 
                cy="50" 
                r="45" 
                stroke={props.borderColor ?? "black"} 
                strokeWidth="5"
                fill={props.fill ?? "black"}
            />
            Sorry, your browser does not support inline SVG.  
        </svg>
    )
}