import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export const API_BASE_URL = 'https://127.0.0.1:8000';

function DashboardAppPage() {
  const theme = useTheme();
  const [products, setproduct] = useState([]);
  console.log("hellooooooooo");

  useEffect(() => {
    async function getProduct() {
      try {
        console.log("hiiiiiii");
        const response = await fetch(`${API_BASE_URL}/product`);
        
        const data = await response.json();
        setproduct(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    getProduct();
  }, []);



  
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        {products.length === 0 ? (
          <Typography>Loading...</Typography>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.title}  
                <br/> {product.description} 
                <br/> {product.price} 
                <br/> {product.image} 
                <br/> {product.nbr_stock}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}

export default DashboardAppPage;
