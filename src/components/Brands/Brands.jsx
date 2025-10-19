import { Box, Card, CardMedia, CircularProgress, Grid, Typography,CardContent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../API/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
export default function Brands() {
   const { t} = useTranslation();

    // const [brands, setBrands]= useState([]);
    // const [isLoading,setIsLoading]= useState(true);

    // const getBrands = async () => {
    //    try{
    //      const response = await axios.get('https://kashop1.runasp.net/api/Customer/Brands');
    //      setBrands(response.data);
    //    }catch(error){
    //      console.log(error);
    //    }finally{
    //      setIsLoading(false);
    //    }
    //     // const data = await response.json();
    //     // setBrands(data);
    //     // setIsLoading(false);
    // }
    
    // useEffect(() => {
    //     getBrands();
    // },[])

    // if(isLoading){
    //     return (
    //         <CircularProgress/>
    //     )
    // }
    const fetchBrands = async () => {
        const response = await AxiosInstance.get('/Brands');
        return response.data;
    }
    const {data,isLoading,isError, error} = useQuery({
        queryKey: ['brands'],
        queryFn: fetchBrands,
        staleTime: 1000 * 60 * 5
    });
    console.log(data);
    if(isError){return <div>Error: {error.message}</div>}
    if(isLoading) return <CircularProgress/>
 return (
  <Box sx={{py: 7, px: 2, bgcolor: 'background.default', color: 'text.primary' }}>
    <Typography variant="h4" id="Brands" component="h1" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
      {t("Our Brands")}
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {data.map((brand) => (
        <Grid key={brand.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
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
              image={brand.mainImageUrl}
              alt={brand.name}
              sx={{ height: 140, width: '100%', objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
            <CardContent sx={{ width: '100%', textAlign: 'center', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {brand.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

}
