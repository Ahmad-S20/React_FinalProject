import { CircularProgress, Typography, Box, Card, CardContent, Grid, CardMedia } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Products() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]); // Initialize as an empty array

  const getProducts = async () => {
    try {
      const response = await axios.get('https://kashop1.runasp.net/api/Customer/Products');
      // Ensure that response.data is always an array
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setProducts([]); // In case of error, set products to an empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  // Check if products is empty and display a message if so
  if (products.length === 0) {
    return (
      <Box sx={{ py: 7, px: 2, bgcolor: 'background.default', color: 'text.primary' }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          {t("Our Products")}
        </Typography>
        <Typography variant="h6" sx={{ color: 'red', textAlign: 'center' }}>
          {t("There are no products available at the moment.")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 7, px: 2, bgcolor: 'background.default', color: 'text.primary' }}>
      <Typography variant="h4" id="Products" component="h1" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
        {t("Our Products")}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  maxWidth: 300,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: 3,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.mainImageUrl}
                  alt={product.name}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />

                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {product.name.split(' ').slice(0, 4).join(' ')}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {product.price}$
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
