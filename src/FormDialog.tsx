import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dropdown, IDropdownOption } from '@fluentui/react';

export interface IFormDialogProps {
    isOpen: boolean;
    playerOptions: IDropdownOption[];
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
    const [dropdownOptions, setDropdownOptions] = React.useState<IDropdownOption[]>([])
    const [defaultOptionApplied, setDefaultOptionApplied] = React.useState<boolean>(false)
    const [defaultKey, setDefaultKey] = React.useState<string>('')

    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = React.useCallback((reason: string) => () => {
        if (reason === 'backdropClick')
            return;
    }, []);

    React.useEffect(() => {
        if (props.playerOptions){
            setDropdownOptions(props.playerOptions)
            if (!defaultOptionApplied){
                setSelectedKey(props.playerOptions[0].key.toString());
                setDefaultKey(props.playerOptions[0].key.toString());
                setDefaultOptionApplied(true);
                console.log(`setting selected key to ${props.playerOptions[0].key}`)
            }
        }
    }, [props.playerOptions]);

    const handleLockInClicked = () => {
        if (!selectedKey){
            console.log(`selectedKey = ${selectedKey}`)
            return;
        }

        console.log(`handleLockInClicked player = ${player}`)
        playerChoicesRef.current = [...playerChoicesRef.current, {player: player, choice: selectedKey.toString()}]
        if (player === 1){
            const options = props.playerOptions.filter(op => op.key !== selectedKey)
            setDropdownOptions(options)
            setSelectedKey(options[0].key)
            setDefaultKey(options[0].key.toString());
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

    return (
    <div>
        <Dialog open={props.isOpen} onClose={handleClose} disableEscapeKeyDown={true}>
            <DialogTitle>{`Player ${player}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select your fighter!
                </DialogContentText>
                <Dropdown
                    options={dropdownOptions}
                    onChange={handleDropdownChange}
                    defaultSelectedKey={defaultKey}
                />
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
            <DialogActions>
                <Button onClick={handleLockInClicked}>Lock In</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}