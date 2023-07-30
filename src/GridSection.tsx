import React from 'react';
import DiscordIcon from './Icons/discordIcon.png';
import TransparentIcon from './Icons/transparentIcon.png';
import ZoeyIcon1 from './Icons/zoeyIcon1.jpg';
import ZoeyIcon2 from './Icons/zoeyIcon2.jpg';
import KayBearIcon from './Icons/kaybearIcon.png';


export enum Status {
    Empty,
    Playable,
    Player1Owned,
    Player2Owned
}

export interface IGridSectionProps {
    id: number
    x: number
    y: number
    status: Status
    disabled: boolean
    winningCell: boolean
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, y: number, x: number) => void;
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
        backgroundColor: props.winningCell ? 'green' : undefined,
        whiteSpace: 'nowrap'
    }

    const getGridImage = () : string => {
        switch (props.status) {
            default:
            case Status.Empty:
            case Status.Playable:
                return TransparentIcon;
            case Status.Player1Owned:
                return KayBearIcon;
            case Status.Player2Owned:
                return ZoeyIcon2;
        }
    }

    return (
        <button 
            style={buttonStyle}
            onClick={(event) => props.onClick(event, props.x, props.y)}
            disabled={props.disabled}
        >
            <img 
                src={getGridImage()}
                alt={'X'}
                width={'100%'}
                height={'100%'}>
            </img>
        </button>
    )
}