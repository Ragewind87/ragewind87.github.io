import React from 'react';
import EmptyCell from './Icons/emptyCell.png';
import EmptyCellGreen from './Icons/emptyCellGreen.png';
import { type Player } from './ConnectFour.js';

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
                return properties.columnIsMouseover && properties.y === 0
                    ? EmptyCellGreen
                    : EmptyCell;
            }

            case Status.Player1Owned: {
                const player = properties.players.find((p) => p.id === 1) ?? properties.players[0];
                if (!player.options) {
                    return EmptyCell;
                }

                return properties.winningCell
                    ? player.options?.wincell
                    : player.options?.normalCell;
            }

            case Status.Player2Owned: {
                const player = properties.players.find((p) => p.id === 2) ?? properties.players[0];
                if (!player.options) {
                    return EmptyCell;
                }

                return properties.winningCell
                    ? player.options?.wincell
                    : player.options?.normalCell;
            }
        }
    };

    const onMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!properties.disabled) {
            properties.setMouseoverColumn(properties.x);
        }
    };

    const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
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
                maxWidth: '15.0vh',
                maxHeight: '15.0vh',
            }}
        >
            <img src={getGridImage()} alt={'X'} width={'100%'} height={'100%'}></img>
        </div>
    );
};
