import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

async function loginUser(credentials) {
  return fetch('https://127.0.0.1:8000/login_check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const errors = {};

    if (username.trim() === '') {
      errors.username = 'Email address is required.';
    } else if (!username.includes('@')) {
      errors.username = 'Email address must contain @.';
    }
    
    if (password.trim() === '') {
      errors.password = 'Password is required.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await loginUser({
      username,
      password,
    });

    if ('token' in response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard', { replace: true });
    } else {
      setLoginError('Invalid email or password.'); // Définit l'erreur de connexion
    }
  };

  const handleFieldFocus = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '', // Efface l'erreur du champ spécifié
    }));
    setLoginError(''); // Efface l'erreur de connexion lorsqu'on commence à écrire
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setUserName(e.target.value)}
          onFocus={() => handleFieldFocus('username')} // Réinitialise l'erreur lorsqu'on commence à écrire
          error={!!errors.username}
          helperText={errors.username}
        />

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
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => handleFieldFocus('password')} // Réinitialise l'erreur lorsqu'on commence à écrire
          error={!!errors.password}
          helperText={errors.password}
        />

        {loginError && (
          <Alert severity="error" onClose={() => setLoginError('')}>
            {loginError}
          </Alert>
        )}
        
      </Stack>

      <LoadingButton sx={{ mt: 5 }} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}