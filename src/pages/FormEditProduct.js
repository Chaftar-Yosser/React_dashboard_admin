import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Stack, Button, Container, Typography, TextField } from '@mui/material';

export const API_BASE_URL = 'https://127.0.0.1:8000';

export default function FormEditProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [nbrStock, setNbrStock] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch(`${API_BASE_URL}/product/showDetail/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setNbrStock(data.nbrStock);
        setImage(data.image);
      } catch (err) {
        console.error(err);
      }
    }
    getCategory();
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleNbrStockChange = (event) => {
    setNbrStock(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/product/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title , description , price, nbrStock , image}),
      });
      const data = await response.json();
      navigate('/dashboard/product');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Edit Product
        </Typography>
      </Stack>

      <Card>
        <Stack padding={5} spacing={3}>
          <TextField name="title" label="title"  value={title} onChange={handleTitleChange} />
          <TextField name="description" label="description"  value={description} onChange={handleDescriptionChange} />
          <TextField name="price"  label="price" value={price} onChange={handlePriceChange} />
          <TextField name="nbr_stock"  label="nombre de stock" value={nbrStock} onChange={handleNbrStockChange} />
          <TextField name="image"  label="image" value={image} onChange={handleImageChange} />
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
