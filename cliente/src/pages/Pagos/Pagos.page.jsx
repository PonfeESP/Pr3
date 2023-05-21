import React, { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { Header } from '../../components/Header.component';
import PagosMensaje from './components/PagosTable.component';

export const PagosPage = () => {
  useEffect(() => {
    document.title = "PAGOS";
  }, []);

  return (
    <div>
      <Header />
      <Paper>
        <Typography variant="h1" color="primary">Pagos</Typography>
        <PagosMensaje />
      </Paper>
    </div>
  );
};

export default PagosPage;