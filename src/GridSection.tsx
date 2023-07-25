import React, { Component } from 'react';
import DiscordIcon from './Icons/discordIcon.png';
import TransparentIcon from './Icons/transparentIcon.png';
import ZoeyIcon1 from './Icons/zoeyIcon1.jpg';
import ZoeyIcon2 from './Icons/zoeyIcon2.jpg';

export interface IGridSectionProps {
    id: number
    x: number
    y: number
    image: GridImage
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, y: number, x: number) => void;
}

export enum GridImage {
    Transparent,
    Zoey1,
    Zoey2
}

export interface IMainGrid {
    grid: IGridSectionProps[][]
}


export const GridSection: React.FunctionComponent<IGridSectionProps> = (props) => {

    const buttonStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
        borderRadius: '5px',
        boxShadow:'none',
    }      

    const getGridImage = (image: GridImage) : string => {
        let srcString = '';
        switch (image) {
            default:
            case GridImage.Transparent:
                srcString = TransparentIcon;
                break;
            case GridImage.Zoey1:
                srcString = ZoeyIcon1;
                break;
            case GridImage.Zoey2:
                srcString = ZoeyIcon2;
                break;
        }
        return srcString;
    }

    return (
        <button 
            color="blue" 
            style={buttonStyle}
            onClick={(event) => props.onClick(event, props.y, props.x)}
        >
            <img 
                src={getGridImage(props.image)}
                alt={'X'}
                width={'100%'}
                height={'100%'}
            >
            </img>
        </button>
    )
}