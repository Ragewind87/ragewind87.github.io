import React, { Component } from 'react';

export interface IGridSectionProps {
    id: number
}


export const GridSection: React.FunctionComponent<IGridSectionProps> = (props) => {

    const buttonStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
        borderRadius: '5px',
        boxShadow:'none',
    }      

    return (
        <button 
            color="blue" 
            style={buttonStyle}
        />
    )
}