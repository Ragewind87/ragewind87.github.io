import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { PlayerOption } from './App';
import { IPlayerCardProps, PlayerCard } from './PlayerCard';

export interface IFormDialogProps {
    isOpen: boolean;
    playerOptions: PlayerOption[];
    closeDialog: () => void;
    setPlayerChoices: (choices: PlayerChoice[]) => void;
}

export interface PlayerChoice {
    player: number,
    choice: string
}

export const FormDialog: React.FunctionComponent<IFormDialogProps> = (props) => {
    const [player, setPlayer] = React.useState<number>(1);
    const playerChoicesRef = React.useRef<PlayerChoice[]>([])

    React.useEffect(() => {
        if (!props.isOpen){
            playerChoicesRef.current = [];
            setPlayer(1);
        }
    }, [props.isOpen])

    const handleClose = (reason: string) => {
        if (reason === 'backdropClick')
            return;
    };

    const handleOnClick = (key: string) => {
        playerChoicesRef.current = [...playerChoicesRef.current, {player: player, choice: key.toString()}]
        if (player === 1){
            setPlayer(2)
        }
        else if (player === 2){
            props.setPlayerChoices(playerChoicesRef.current)
            props.closeDialog()
        }
    }

    const renderPlayerChoiceCards = () => {
        return (
            props.playerOptions.map((op) => { 
                const disabled = playerChoicesRef.current.findIndex(pc => pc.choice === op.id) !== -1;           
                return (
                    <PlayerCard
                        key={op.id}
                        id={op.id}
                        cardName={op.name}
                        cardImage={op.icon}
                        onClick={handleOnClick}
                        disabled={disabled}
                    />
                )
            })
        )
    }

    const titleStyle : React.CSSProperties = {
        fontFamily: 'Candara', fontSize: '30px', fontWeight: 'bold', color: 'black',
        textAlign: 'center', lineHeight: '22px'
    }

    const subTitleStyle : React.CSSProperties = {
        fontFamily: 'Segoe UI Black', fontSize: '26px', fontWeight: 'bold',        
        marginBottom: '20px', textAlign: 'center', 
        color: player === 1 ? '#ad1f00' : '#0b00ad',
    }

    return (
        <div>
            <Dialog open={props.isOpen} onClose={handleClose} disableEscapeKeyDown={true} >
                {/* <DialogTitle
                    style={{fontSize: '24px', alignSelf: 'center'}}
                >
                    Choose Your Fighter
                </DialogTitle> */}
                <DialogContent style={{minWidth: '200px', height: '100%', backgroundColor: '#a7a7a7'}}>
                    <DialogContentText style={titleStyle}>
                        {`Choose Your Fighter!`}
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
}