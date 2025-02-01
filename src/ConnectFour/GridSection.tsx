import React from 'react';

import EmptyCell from './Icons/emptyCell.png';
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

export const GridSection: React.FunctionComponent<IGridSectionProps> = (properties) => {
    const getGridImage = (): string => {
        switch (properties.status) {
            case Status.Empty:
            case Status.Playable: {
                return properties.columnIsMouseover && properties.y === 0 ? EmptyCellGreen : EmptyCell;
            }

            case Status.Player1Owned: {
                const player = properties.players.find((p) => p.id === 1) ?? properties.players[0];
                if (!player.options) {
                    return EmptyCell;
                }

                return properties.winningCell ? player.options?.wincell : player.options?.normalCell;
            }

            case Status.Player2Owned: {
                const player = properties.players.find((p) => p.id === 2) ?? properties.players[0];
                if (!player.options) {
                    return EmptyCell;
                }

                return properties.winningCell ? player.options?.wincell : player.options?.normalCell;
            }
        }
    };

    const onMouseOver = () => {
        if (!properties.disabled) {
            properties.setMouseoverColumn(properties.x);
        }
    };

    const handleOnMouseLeave = () => {
        if (!properties.disabled) {
            properties.setMouseoverColumn(-1);
        }
    };

    return (
        <div
            id={`${properties.y}, ${properties.x}`}
            onClick={
                properties.disabled
                    ? undefined
                    : (event) => {
                          properties.onClick(event, properties.x, properties.y);
                      }
            }
            onMouseOver={onMouseOver}
            onMouseLeave={handleOnMouseLeave}
            style={{
                width: '14vh',
                height: '14vh',
            }}
        >
            <img src={getGridImage()} alt={'X'} width={'100%'} height={'100%'}></img>
        </div>
    );
};
