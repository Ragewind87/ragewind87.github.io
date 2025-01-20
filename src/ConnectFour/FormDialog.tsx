/* eslint-disable no-empty */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Dropdown, IDropdownOption} from '@fluentui/react';
import {type IPlayerOption} from './ConnectFour.js';
import {IPlayerCardProps, PlayerCard} from './PlayerCard.js';

export type IFormDialogProps = {
	isOpen: boolean;
	playerOptions: IPlayerOption[];
	closeDialog: () => void;
	setPlayerChoices: (choices: PlayerChoice[]) => void;
};

export type PlayerChoice = {
	player: number;
	choice: string;
};

export const FormDialog: React.FunctionComponent<IFormDialogProps> = properties => {
	const [player, setPlayer] = React.useState<number>(1);
	const playerChoicesReference = React.useRef<PlayerChoice[]>([]);

	React.useEffect(() => {
		if (!properties.isOpen) {
			setTimeout(() => {
				playerChoicesReference.current = [];
				setPlayer(1);
			}, 500);
		}
	}, [properties.isOpen]);

	const handleClose = (reason: string) => {
		if (reason === 'backdropClick') {}
	};

	const handleOnClick = (key: string) => {
		playerChoicesReference.current = [...playerChoicesReference.current, {player, choice: key.toString()}];
		if (player === 1) {
			setPlayer(2);
		} else if (player === 2) {
			properties.setPlayerChoices(playerChoicesReference.current);
			properties.closeDialog();
		}
	};

	const renderPlayerChoiceCards = () => (
		properties.playerOptions.map(op => {
			const disabled = playerChoicesReference.current.some(pc => pc.choice === op.id);
			return (
				<PlayerCard
					key={op.id}
					id={op.id}
					cardName={op.name}
					cardImage={op.icon}
					onClick={handleOnClick}
					disabled={disabled}
				/>
			);
		})
	);

	const titleStyle: React.CSSProperties = {
		fontFamily: 'Candara', fontSize: '30px', fontWeight: 'bold', color: 'black',
		textAlign: 'center', lineHeight: '22px',
	};

	const subTitleStyle: React.CSSProperties = {
		fontFamily: 'Segoe UI Black', fontSize: '26px', fontWeight: 'bold',
		marginBottom: '20px', textAlign: 'center',
		color: player === 1 ? '#ad1f00' : '#0b00ad',
	};

	return (
		<div>
			<Dialog open={properties.isOpen} onClose={handleClose} disableEscapeKeyDown={true} >
				{/* <DialogTitle
                    style={{fontSize: '24px', alignSelf: 'center'}}
                >
                    Choose Your Fighter
                </DialogTitle> */}
				<DialogContent style={{minWidth: '200px', height: '100%', backgroundColor: '#a7a7a7'}}>
					<DialogContentText style={titleStyle}>
						{'Choose Your Fighter!'}
					</DialogContentText>
					<DialogContentText style={subTitleStyle}>
						{`Player ${player}`}
					</DialogContentText>

					{renderPlayerChoiceCards()}

				</DialogContent>
				{/* <DialogActions>
                    <Button
                        onClick={handleLockInClicked}
                        style={{
                            fontSize: `26px`,
                            fontWeight: `1000`
                        }}
                    >
                        Lock In
                    </Button>
                </DialogActions> */}
			</Dialog>
		</div>
	);
};
