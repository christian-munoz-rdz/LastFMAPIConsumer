import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Button, Slide } from "@mui/material";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


interface AlertDialogProps{
    title?: string;
    message: string;
    open: boolean;
    handleClose: () => void;
}

const  AlertMessage = ({ title="Alerta", message, open=false, handleClose} : AlertDialogProps) => {
    return (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{title }</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                { message }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
    );   
}

export default AlertMessage;


