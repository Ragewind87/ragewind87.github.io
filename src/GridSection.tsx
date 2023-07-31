import React from 'react';
import ZoeyWindow from './Icons/zoeyWindow.png';
import KayBearWindow from './Icons/kaybearWindow.png';
import ZoeyWindowWin from './Icons/zoeyWindowWin.png';
import KayBearWindowWin from './Icons/kaybearWindowWin.png';
import TransparentWindow from './Icons/transparentWindow.png';


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
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, y: number, x: number) => void;
}

export interface IMainGrid {
    grid: IGridSectionProps[][]
}

export const GridSection: React.FunctionComponent<IGridSectionProps> = (props) => {

    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);

    const buttonStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
        borderRadius: '5px',
        boxShadow:'none',
        backgroundColor: ((isMouseOver && !props.disabled) || props.winningCell) ? 'green' : undefined,
    }

    const getGridImage = () : string => {
        switch (props.status) {
            default:
            case Status.Empty:
            case Status.Playable:
                return TransparentWindow;
            case Status.Player1Owned: {
                return props.winningCell ? KayBearWindowWin : KayBearWindow;
            }
            case Status.Player2Owned:
                return props.winningCell ? ZoeyWindowWin : ZoeyWindow;
        }
    }

    const onMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseOver(true)
    }

    const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseOver(false)
    }

    return (
        <div 
            style={buttonStyle}
            onClick={props.disabled ? undefined : (event) => props.onClick(event, props.x, props.y)}
            onMouseOver={onMouseOver}
            onMouseLeave={handleOnMouseLeave}
        >
            <img 
                src={getGridImage()}
                alt={'X'}
                width={'100%'}
                height={'100%'}>
            </img>
        </div>
    )
}