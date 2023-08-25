import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
  } from '@mui/material';
  import React from 'react';
  
  interface DialogConfirmProps {
    title: string;
    subtitle?: string;
    description?: string;
    opendialog: boolean;
    actionCancel: () => void;
    actionConfirm: () => void;
  }
  
  const DialogConfirm: React.FC<DialogConfirmProps> = ({
    title,
    opendialog,
    actionCancel,
    actionConfirm,
    subtitle,
    description
  }) => {
    return (
      <Dialog
        open={opendialog}
        onClose={actionCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <>
              <Typography variant="h5">{subtitle}</Typography>
              <Typography variant="body1">{description}</Typography>
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={actionConfirm} autoFocus>
            Confirmar
          </Button>
          <Button variant="contained" onClick={actionCancel}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DialogConfirm;