import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Stack, Button, Container, Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../components/iconify';

export const API_BASE_URL = 'https://127.0.0.1:8000';

export default function FormEdit() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch(`${API_BASE_URL}/category/showDetail/${id}`);
        console.log("hhhhhhhhhhhhhhhhhhhhhh")
        const data = await response.json();
        setTitle(data.title);
        console.log(data)
      } catch (err) {
        console.error(err);
      }
    }
    getCategory();
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/category/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      navigate('/dashboard/category');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Edit Category
        </Typography>
      </Stack>

      <Card>
        <Stack padding={5} spacing={3}>
          <TextField name="title" label=""  value={title}
            onChange={handleTitleChange} />
        </Stack>

        <Stack mb={4} ml={5} direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" onClick={handleSubmit}>
            Save changes
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}
