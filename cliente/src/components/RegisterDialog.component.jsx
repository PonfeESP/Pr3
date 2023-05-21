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
import { CinemasPage } from './../pages/Cinemas/Cinemas.page'
import { LandingPage } from '../pages/Landing/Landing.page';

export const RegisterDialog = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [registrationError, setRegistrationError] = useState(""); // Agregada la declaración de setRegistrationError
  const navigate = useNavigate();
  const [redirectToCinemas, setRedirectToCinemas] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const performRegistration = (event) => {
    event.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setRegistrationError('');

    if (username === '') setUsernameError(true);
    if (password === '') setPasswordError(true);
    if (confirmPassword === '') setConfirmPasswordError(true);
    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
    }

    if (!!username && !!password && password === confirmPassword) {
      axios({
        url: 'http://localhost:8080/register',
        method: 'POST',
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      })
        .then((response) => {
          if (response.data.status === 'OK') {
            navigate('/pagos'); // Navega a la página de cines
          } else {
            setRegistrationError('Error en el registro. Inténtalo de nuevo, por favor.');
          }
        })
        .catch((error) => {
          console.log('Error en el registro:', error);
          setRegistrationError('Error en el registro. Inténtalo de nuevo, por favor.');
        });
    }
  };

  if (redirectToCinemas) {
    return <LandingPage />; // Redirige a la página de cines
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Registrarse</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrarse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete el formulario de registro.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            margin="dense"
            id="username"
            label="Usuario"
            fullWidth
            variant="standard"
            error={usernameError}
            helperText={usernameError && 'Por favor, ingrese un nombre de usuario.'}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
            error={passwordError}
            helperText={passwordError && 'Por favor, ingrese una contraseña.'}
          />
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="dense"
            id="confirm-password"
            label="Confirmar Contraseña"
            type="password"
            fullWidth
            variant="standard"
            error={confirmPasswordError}
            helperText={
              confirmPasswordError && 'Por favor, confirme su contraseña.'
            }
          />
          {registrationError && <p>{registrationError}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={performRegistration}>Registrarse</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
