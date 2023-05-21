import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PagosDialog = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [paymentError, setPagoError] = useState('');
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitPayment = (event) => {
    event.preventDefault();
    setAmountError(false);
    setPagoError('');

    if (amount === '') {
      setAmountError(true);
      return;
    }

    // Hacer la llamada a la API de pago
    axios({
      url: 'http://localhost:8080/pago',
      method: 'POST',
      data: {
        amount: amount
      },
    })
      .then((response) => {
        if (response.data.status === 'OK') {
          navigate('/cines'); // Navegar a la página de pagos después de un pago exitoso
          handleClose(); // Cerrar el diálogo después de un pago exitoso
        } else {
          setPagoError('Error en el pago. Inténtalo de nuevo, por favor.');
        }
      })
      .catch((error) => {
        console.log('Error en el pago:', error);
        setPagoError('Error en el pago. Inténtalo de nuevo, por favor.');
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Realizar Pago</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Formulario de Pago</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, introduzca la cantidad a pagar.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e) => setAmount(e.target.value)}
            margin="dense"
            id="amount"
            label="Cantidad"
            fullWidth
            variant="standard"
            error={amountError}
            helperText={amountError && 'Por favor, ingrese una cantidad válida.'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={submitPayment}>Pagar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
