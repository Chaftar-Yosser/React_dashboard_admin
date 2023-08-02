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
  TextareaAutosize ,

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
  
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://127.0.0.1:8000/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title , description , price, nbrStock , image}),
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
            <TextField name="title" label="product title" value={title} onChange={(e) => setTitle(e.target.value)} />
          

            {/* <TextareaAutosize name="description" placeholder="description"  id="outlined-basic" variant="outlined" minRows={7}/> */}

            <TextField name="description" label="description"  value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField name="price"  label="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <TextField name="nbr_stock"  label="nombre de stock" value={nbrStock} onChange={(e) => setNbrStock(e.target.value)} />
            <TextField name="image"  label="image" value={image} onChange={(e) => setImage(e.target.value)} />
          </Stack>

          <Stack mb={4} ml={5} direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="contained" onClick={handleSubmit} >Submit</Button>
          </Stack>

        </Card>
      </Container>
    </>
  );
}
