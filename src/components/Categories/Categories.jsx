import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
export default function Categories() {
    const { t} = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const getCategories = async ()=>{
        try
        {
            const response = await axios.get('https://kashop1.runasp.net/api/Customer/Categories');
            setCategories(response.data);
        }catch(error)
        {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getCategories();
    },[])
    if(isLoading)
    {
        return(
           <CircularProgress/>
        )
    }
  return (
  <Box sx={{ py: 7, px: 2, bgcolor: 'background.default', color: 'text.primary' }}>
    <Typography variant="h4" component="h1" id="categories" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
      {t('Our Categories')}
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {categories.map((category) => (
        <Grid key={category.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6,
              },
              py: 3,
            }}
          >
            <CardContent sx={{ width: '100%', textAlign: 'center', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);
}
