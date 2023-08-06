import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {  Stack,Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------


async function loginUser(credentials) {
  // console.log(localStorage.getItem('token'));
  return fetch('https://127.0.0.1:8000/login_check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajouter le jeton à l'en-tête Authorization
    },
    
    
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();


  const handleClick = async (event) => {
      event.preventDefault();
      const response = await loginUser({
        username,
        password
      });
      if ('token' in response) {
        // alert("Success", response.message, "success", {
        //   buttons: false,
        //   timer: 2000,
        // })
        // .then((value) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          navigate('/dashboard', { replace: true });
        // });

      } else {
        alert("Failed", response.message, "error");
      }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"   onChange={e => setUserName(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={e => setPassword(e.target.value)}
        />
      </Stack>


      <LoadingButton sx={{ mt: 5 }} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
