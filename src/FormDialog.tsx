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
    const [selectedKey, setSelectedKey] = React.useState<string | number>() 
    const [playerCardOptions, setPlayerCardOptions] = React.useState<IPlayerCardProps[]>([])
    const [defaultOptionApplied, setDefaultOptionApplied] = React.useState<boolean>(false)
    const [defaultKey, setDefaultKey] = React.useState<string>('')

    // React.useEffect(() => {
    //     console.log(props.playerOptions)
    // }, [props.playerOptions])

    React.useEffect(() => {
        if (!props.isOpen){
            playerChoicesRef.current = [];
            setPlayer(1);
        }
    }, [props.isOpen])
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = React.useCallback((reason: string) => () => {
    //     if (reason === 'backdropClick')
    //         return;
    // }, []);

    const handleClose = (reason: string) => {
        if (reason === 'backdropClick')
            return;
    };

    // React.useEffect(() => {
    //     if (props.playerOptions){
    //         setDropdownOptions(props.playerOptions)
    //         if (!defaultOptionApplied){
    //             setSelectedKey(props.playerOptions[0].key.toString());
    //             setDefaultKey(props.playerOptions[0].key.toString());
    //             setDefaultOptionApplied(true);
    //             console.log(`setting selected key to ${props.playerOptions[0].key}`)
    //         }
    //     }
    // }, [props.playerOptions]);

    const handleOnClick = (key: string) => {
        console.log(`handleOnClick() | key = ${key} player = ${player}`)
        // if (!selectedKey){
        //     console.log(`selectedKey = ${selectedKey}`)
        //     return;
        // }

        playerChoicesRef.current = [...playerChoicesRef.current, {player: player, choice: key.toString()}]
        if (player === 1){
            //const options = props.playerOptions.filter(op => op.key !== key)
            //setDropdownOptions(options)
            // setSelectedKey(options[0].key)
            // setDefaultKey(options[0].key.toString());
            setPlayer(2)
        }
        else if (player === 2){
            props.setPlayerChoices(playerChoicesRef.current)
            props.closeDialog()
        }
    }

    const handleDropdownChange =
        (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {     
            console.log(`handleDropdownChange | option`)   
            console.log(option)   
        setSelectedKey(option?.key ?? '')
    };

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

                    {/* <Dropdown
                        options={dropdownOptions}
                        onChange={handleDropdownChange}
                        defaultSelectedKey={defaultKey}
                        style={{marginTop: '30px'}}
                    /> */}
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    /> */}
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