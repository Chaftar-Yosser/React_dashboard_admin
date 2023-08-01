import React ,{ useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';

export default function FormPages() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://127.0.0.1:8000/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          <TextField name="title" label="category title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <TextField
              name="password"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <Iconify icon={'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack mb={4} ml={5} direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="contained" onClick={handleSubmit} >Submit</Button>
          </Stack>

        </Card>
      </Container>
    </>
  );
}
