import React from 'react';
import Button from '@material-ui/core/Button';
import Alert from "./Alert"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const { handleAction, setOpen, open, title, content, children, empty } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                {
                    empty &&
                    <Alert type="error" message='Remplir le champ avant valider' />
                }
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Annuler</Button>
                    <Button onClick={handleAction} color="primary"> Valider </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
