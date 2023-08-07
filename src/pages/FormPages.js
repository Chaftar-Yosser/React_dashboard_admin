import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Stack, Button, Container, Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';

export default function FormPages() {
  const [title, setTitle] = useState('');

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === '') {
      setError(true);
      return;
    }

    try {
      const response = await fetch('https://127.0.0.1:8000/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le jeton à l'en-tête Authorization
        },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();
      console.log(data);
      setTitle('');

      // Rediriger l'utilisateur vers la page category
      navigate('/dashboard/category');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create
          </Typography>
        </Stack>

        <Card>
          <Stack padding={5} spacing={3}>
            {/* <TextField name="title" label="category title" value={title} onChange={(e) => setTitle(e.target.value)} /> */}

            <TextField
              name="title"
              label="category title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(false); // Réinitialisez l'état d'erreur lorsqu'une modification est apportée
              }}
              error={error} // Ajoutez l'attribut error pour afficher l'état d'erreur
              id="outlined-error-helper-text" // Ajoutez l'ID pour l'attribut error
              helperText={error ? 'Incorrect entry.' : ''} // Ajoutez le texte d'aide si une erreur est présente
            />
          </Stack>

          <Stack mb={4} ml={5} direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
