import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

export const PagosMensaje = () => {
  const [amount, setAmount] = useState('');

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/pago', {
        amount: parseFloat(amount),
      });

      if (response.status === 200) {
        console.log('Pago realizado correctamente');
      } else {
        console.log('Error en la solicitud de pago');
      }
    } catch (error) {
      console.log('Error en la solicitud de pago:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="amount"
        label="Monto"
        value={amount}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Pagar
      </Button>
    </form>
  );
};

export default PagosMensaje;
