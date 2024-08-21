import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmDeleteDialog =({open,handleClose,handleDelete})=>{
    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this Group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDeleteDialog;