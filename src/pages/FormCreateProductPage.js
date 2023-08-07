import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';

export default function FormCreateProductPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [nbrStock, setNbrStock] = useState('');
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState({});

  // isNumber to check if a value is a number
  const isNumber = (value) => {
    return !Number.isNaN(Number(value));
  };

  const validateForm = () => {
    const errors = {};

    // Check required fields
    if (title.trim() === '') {
      errors.title = 'Title is required.';
    }
    if (description.trim() === '') {
      errors.description = 'Description is required.';
    }
    if (price.trim() === '') {
      errors.price = 'Price is required.';
    } else if (!isNumber(price)) {
      errors.price = 'Price must be a number.';
    }
    if (nbrStock.trim() === '') {
      errors.nbrStock = 'Number of stock is required.';
    } else if (!isNumber(nbrStock)) {
      errors.nbrStock = 'Number of stock must be a number.';
    }
    if (image.trim() === '') {
      errors.image = 'Image is required.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onInputChange = (fieldName, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',   // Efface l'erreur du champ spécifié
    }));

    // Mettre à jour l'état du champ avec la valeur saisie par l'utilisateur
    switch (fieldName) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        if (!isNumber(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: 'Price must be a number.',
          }));
        }
        setPrice(value);
        break;
      case 'nbrStock':
        if (!isNumber(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: 'Number of stock must be a number.',
          }));
        }
        setNbrStock(value);
        break;
      case 'image':
        setImage(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('https://127.0.0.1:8000/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description, price, nbrStock, image }),
      });

      const data = await response.json();
      console.log(data);
      setTitle('');
      setDescription('');
      setPrice('');
      setNbrStock('');
      setImage('');

      navigate('/dashboard/product');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create a new Product
          </Typography>
        </Stack>

        <Card>
          <Stack padding={5} spacing={3}>
            <TextField
              name="title"
              label="product title"
              value={title}
              onChange={(e) => onInputChange('title', e.target.value)}
              error={!!errors.title}  // Use double negation to convert truthy/falsy value to boolean
              helperText={errors.title}
              id="outlined-error-helper-text"
            />

            <TextField
              name="description"
              label="description"
              value={description}
              onChange={(e) => onInputChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              id="outlined-error-helper-text"
            />

            <TextField
              name="price"
              label="price"
              value={price}
              onChange={(e) => onInputChange('price', e.target.value)}
              error={!!errors.price}
              helperText={errors.price}
              id="outlined-error-helper-text"
            />

            <TextField
              name="nbr_stock"
              label="number of stock"
              value={nbrStock}
              onChange={(e) => onInputChange('nbrStock', e.target.value)}
              error={!!errors.nbrStock}
              helperText={errors.nbrStock}
              id="outlined-error-helper-text"
            />

            <TextField
              name="image"
              label="image"
              value={image}
              onChange={(e) => onInputChange('image', e.target.value)}
              error={!!errors.image}
              helperText={errors.image}
              id="outlined-error-helper-text"
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