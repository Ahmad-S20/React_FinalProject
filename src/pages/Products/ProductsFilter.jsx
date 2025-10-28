import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProductsFilter() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from API
  const getProducts = async () => {
    try {
      const response = await axios.get('https://kashop1.runasp.net/api/Customer/Products');
      const productData = response.data?.data || []; // Ensure we access the correct `data` field
      setProducts(productData);
      setFilteredProducts(productData); // Initially show all products
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    getProducts();
  }, []);

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query, only if products are available
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  if (isLoading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  }

  // Show no products found message with some cool styling
  const renderNoProductsFound = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
        {t('Oops! No products available right now.')}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        {t('Check back soon or try searching with different keywords!')}
      </Typography>
      <Box sx={{ mt: 2, fontSize: 70, color: 'primary.main' }}>😔</Box>
    </Box>
  );

  return (
    <Box sx={{ py: 7, px: 2, bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label={t('Search Products')}
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          sx={{ maxWidth: 600 }}
        />
      </Box>

      {/* Title */}
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
        {t('All Products')}
      </Typography>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {filteredProducts.map((product) => (
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
      ) : (
        renderNoProductsFound()
      )}
    </Box>
  );
}
