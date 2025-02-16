import React from 'react';

import EmptyCellTransparent from './Icons/emptyCellTransparent.png';
import EmptyCellGreen from './Icons/emptyCellGreen.png';
import { type Player } from './ConnectFour.tsx';

export enum Status {
    Empty,
    Playable,
    Player1Owned,
    Player2Owned,
}

export type IGridSectionProps = {
    id: number;
    x: number;
    y: number;
    players: Player[];
    status: Status;
    disabled: boolean;
    winningCell: boolean;
    columnIsMouseover: boolean;
    setMouseoverColumn: React.Dispatch<React.SetStateAction<number>>;
    onClick: (event: React.MouseEvent<HTMLDivElement>, y: number, x: number) => void;
};

export type IMainGrid = {
    grid: IGridSectionProps[][];
};

export type IPlayerIcons = {
    normalCell: string;
    winCell: string;
};

export const GridSlot: React.FunctionComponent<IGridSectionProps> = (props) => {
    const getGridImage = (): string => {
        switch (props.status) {
            case Status.Empty:
            case Status.Playable: {
                return props.columnIsMouseover && props.y === 0 ? EmptyCellGreen : EmptyCellTransparent;
            }

            case Status.Player1Owned: {
                const player = props.players.find((p) => p.id === 1) ?? props.players[0];
                if (!player.options) {
                    return EmptyCellTransparent;
                }

                return props.winningCell ? player.options.wincell : player.options.normalCell;
            }

            case Status.Player2Owned: {
                const player = props.players.find((p) => p.id === 2) ?? props.players[0];
                if (!player.options) {
                    return EmptyCellTransparent;
                }

                return props.winningCell ? player.options.wincell : player.options.normalCell;
            }
        }
    };

    const onMouseOver = () => {
        if (!props.disabled) {
            props.setMouseoverColumn(props.x);
        }
    };

    const handleOnMouseLeave = () => {
        if (!props.disabled) {
            props.setMouseoverColumn(-1);
        }
    };

    return (
        <div
            id={`${props.y}, ${props.x}`}
            onClick={
                props.disabled
                    ? undefined
                    : (event) => {
                          props.onClick(event, props.x, props.y);
                      }
            }
            onMouseOver={onMouseOver}
            onMouseLeave={handleOnMouseLeave}
            // Controls the size of the slots
            style={{
                maxWidth: '14vh',
                maxHeight: '14vh',
                position: 'relative',
            }}
        >
            {/* displays 3D depth shadow behind slot holes */}
            <div
                style={{
                    position: 'absolute',
                    top: '5.2%',
                    left: '4.7%',
                    width: '90%',
                    height: '90%',
                    backgroundColor: 'rgb(39, 39, 39)',
                    boxShadow: 'inset 10px 10px 15px black',
                    borderRadius: '50%',
                    zIndex: 1,
                }}
            />
            <img
                src={getGridImage()}
                alt={'X'}
                width={'100%'}
                height={'100%'}
                style={{
                    position: 'relative',
                    zIndex: 2,
                }}
            ></img>
        </div>
    );
};
