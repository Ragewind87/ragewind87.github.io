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
    closeClicked: () => void;
}


export const FormDialog: React.FunctionComponent<IFormDialogProps> = (props) => {
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        props.closeClicked()
    };

    return (
    <div>
        <Dialog open={props.isOpen} onClose={handleClose}>
            <DialogTitle>Player 1</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select your fighter!
                </DialogContentText>
                <Dropdown
                    options={props.playerOptions}
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}