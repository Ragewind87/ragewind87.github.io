import React from 'react';
import ZoeyWindow from './Icons/zoeyWindow.png';
import KayBearWindow from './Icons/kaybearWindow.png';
import ZoeyWindowWin from './Icons/zoeyWindowWin.png';
import KayBearWindowWin from './Icons/kaybearWindowWin.png';
import EmptyCell from './Icons/emptyCell.png';
import EmptyCellGreen from './Icons/emptyCellGreen.png';

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
    columnIsMouseover: boolean
    setMouseoverColumn: React.Dispatch<React.SetStateAction<number>>;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, y: number, x: number) => void;
}

export interface IMainGrid {
    grid: IGridSectionProps[][]
}

export const GridSection: React.FunctionComponent<IGridSectionProps> = (props) => {

    // const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);

    const getGridImage = () : string => {
        switch (props.status) {
            default:
            case Status.Empty:
            case Status.Playable: 
                return (props.columnIsMouseover && props.y === 0) ? EmptyCellGreen : EmptyCell;

            case Status.Player1Owned:
                return props.winningCell ? KayBearWindowWin : KayBearWindow;   

            case Status.Player2Owned:
                return props.winningCell ? ZoeyWindowWin : ZoeyWindow;
        }
    }

    const onMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        //setIsMouseOver(true)
        if (!props.disabled)
            props.setMouseoverColumn(props.x)
    }

    const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        //setIsMouseOver(false)
        if (!props.disabled)
            props.setMouseoverColumn(-1)
    }

    return (
        <div 
            onClick={!props.disabled ? (event) => props.onClick(event, props.x, props.y) : undefined}
            onMouseOver={onMouseOver}
            onMouseLeave={handleOnMouseLeave}
            style={{
                maxWidth: '14vh',
                maxHeight: '14vh',
                // minWidth: '13%',
                // minHeight: '13%',
                //backgroundColor: ((isMouseOver && !props.disabled) || props.winningCell) ? 'green' : undefined,
            }}
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