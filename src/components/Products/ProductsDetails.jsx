import { Alert, Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress,Rating,Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom'
import { Slide, toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';

export default function ProductsDetails() {
    const {isLoggedIn} = useAuth();
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const queryClient = useQueryClient();
    //console.log(isLoggedIn);

    const addToCart = async (id) => {
       try{
        const token = localStorage.getItem('token');
        const response = await axios.post(`https://kashop1.runasp.net/api/Customer/Carts`,
            {productId:id},
            {headers: { Authorization: `Bearer ${token}` }});
            if(response.status === 200){
                toast.success('Product added to cart successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
                queryClient.invalidateQueries(['cartProducts']);
            }
       }catch(error){
           console.log(error);
       }
    }

    const getProduct = async()=>{
        try{
        const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Products/${id}`);
        setProduct(response.data);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getProduct();
    },[])
    if(isLoading){
        return <CircularProgress />
    }
   
  return (
    <Box py={3}>
        <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',boxShadow: 5, justifyContent: 'center', width: '100%', height: '100%', mx: 'auto'}}>
            <CardMedia sx={{width: 500, height: 500}} 
            alt={product.name}
             src={product.mainImageUrl}
             component="img" image={product.mainImageUrl}>
            </CardMedia>
            <CardContent sx={{display:'flex',flexDirection: 'column',gap:3}}>
                <Typography variant="h4" component="h1">
                    {product.name}
                </Typography>
                 <Rating value={product.rate} readOnly />
                <Typography variant="body2" >
                    {product.description}
                </Typography>
                <Typography variant="h5" component="h2" color='text.secondary'>
                    Price: {product.price}$
                </Typography>
                <Typography component={'p'} variant='body1'>
                    Category: <Chip label={product.categoryName} color='primary' />
                </Typography>
                <Typography component={'p'} variant='body1' >
                    Brands: <Chip label={product.brandName} color='primary' />
                </Typography>
                {isLoggedIn?(<Button variant="contained" onClick={()=>addToCart(product.id)}>Add to cart</Button>)
                :(
                <> 
                 <Button disabled variant="contained" onClick={()=>addToCart(product.id)}>Add to cart</Button>
                <Alert severity="error">Please login to add to cart</Alert>
                </>)}
                
            </CardContent>
        </Card>
    </Box>
  )
}
