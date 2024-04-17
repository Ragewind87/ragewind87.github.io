import React from 'react';
import ZoeyWindow from './Icons/Zoey/zoeyWindow.png';
import ZoeyWindowWin from './Icons/Zoey/zoeyWindowWin.png';
import KayBearWindow from './Icons/Kaybear/kaybearWindow.png';
import KayBearWindowWin from './Icons/Kaybear/kaybearWindowWin.png';
import SkyeWindow from './Icons/Skye/skyeWindow.png';
import SkyeWindowWin from './Icons/Skye/skyeWindowWin.png';
import EmptyCell from './Icons/emptyCell.png';
import EmptyCellGreen from './Icons/emptyCellGreen.png';
import { Player } from './ConnectFour';

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
	players: Player[]
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

export interface IPlayerIcons {
	normalCell: string
	winCell: string
}

export const GridSection: React.FunctionComponent<IGridSectionProps> = (props) => {

	const getGridImage = () : string => {

		switch (props.status) {
			default:
			case Status.Empty:
			case Status.Playable:
				return (props.columnIsMouseover && props.y === 0) ? EmptyCellGreen : EmptyCell;

			case Status.Player1Owned: {				
				const player = props.players.find(p => p.id === 1) ?? props.players[0]
				if (!player.options) return EmptyCell;

				return props.winningCell ? player.options?.wincell : player.options?.normalCell;
			}

			case Status.Player2Owned: {
				const player = props.players.find(p => p.id === 2) ?? props.players[0]
				if (!player.options) return EmptyCell;

				return props.winningCell ? player.options?.wincell : player.options?.normalCell;
			}
		}
	}

	const onMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!props.disabled)
			props.setMouseoverColumn(props.x)
	}

	const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!props.disabled)
			props.setMouseoverColumn(-1)
	}

	return (
		<div
			id={`${props.y}, ${props.x}`}
			onClick={!props.disabled ? (event) => props.onClick(event, props.x, props.y) : undefined}
			onMouseOver={onMouseOver}
			onMouseLeave={handleOnMouseLeave}
			style={{
				maxWidth: '15.0vh',
				maxHeight: '15.0vh',
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
