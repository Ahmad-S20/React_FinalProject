import {Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Paper ,Card, CardContent,FormLabel,RadioGroup,FormControlLabel,Radio, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AxiosUsersInstance from '../../API/AxiosUsersInstance';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useForm,Controller } from 'react-hook-form';

export default function Cart() {
    // const [cartProducts, setcartProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    const removeCartProduct = async (id)=>
    {
      const token = localStorage.getItem('token');
        try{
        const response = await AxiosUsersInstance.delete(`/Carts/${id}`);
        if(response.status === 200){
          queryClient.invalidateQueries(['cartProducts']);
          getProducts();
        }
      }catch(error){
        console.log(error);
      }
    }

    const clearCart = async ()=> {
      try{
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://kashop1.runasp.net/api/Customer/Carts/clear`,
        {
          headers:{
              Authorization: `Bearer ${token}`
          }
        });
        if(response.status === 200){
          queryClient.invalidateQueries(['cartProducts']);
          getProducts();
        }
      }catch(error){
        console.log(error);
      }
    }

    const queryClient = useQueryClient();

    const incQty = async (productId) => {
      try{
        const response = await AxiosUsersInstance.post(`/Carts/increment/${productId}`,
          {}
        );
        if(response.status === 200){
          queryClient.invalidateQueries(['cartProducts']);
          getProducts();
        }
      }catch(error){
        console.log(error);
      }
    }

    const decQty = async (productId) => {
       try{
        const response = await AxiosUsersInstance.post(`https://kashop1.runasp.net/api/Customer/Carts/decrement/${productId}`);
        if(response.status === 200){
          queryClient.invalidateQueries(['cartProducts']);
          getProducts();
        }
      }catch(error){
        console.log(error);
      }
    }

    const getProducts = async () => {
       try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Carts`,
            {headers: { Authorization: `Bearer ${token}` }});
            console.log(response);
       }catch(error){
           console.log(error);
       }
      }
    // }
    // useEffect(() =>
    //   {
    //     getProducts();
    // },[])
    // if(isLoading){
    //   return(
    //        <CircularProgress/>
    //   )
    // }

    //for checkout 
     const fetchCartProducts = async () => {
    const response = await AxiosUsersInstance.get('/Carts');
    return response.data;
  }
     const {register,handleSubmit,control} = useForm({});
     const onSubmit =  async (formData) => {
    try {
        const response = await AxiosUsersInstance.post(`https://kashop1.runasp.net/api/Customer/CheckOut/payment`,{
            paymentMethod: formData.paymentMethod});
    if(response.status === 200){
        console.log(response.data.url);
        location.href = response.data.url;
        queryClient.invalidateQueries(['cartProducts']);
        getProducts();
    }
    } catch (error) {
            console.log(error);
    }
    }

 
  const {data,isLoading,error,isError} = useQuery({
    queryKey: ['cartProducts'],
    queryFn: fetchCartProducts,
    staleTime: 1000 * 60 * 5,
  });

   if(isError){return <div>Error: {error.message}</div>}
   if(isLoading) return <CircularProgress/>

return (
  <TableContainer component={Paper} sx={{ maxWidth: 1200, mx: 'auto', mt: 3, p: 1, borderRadius: 2, boxShadow: 3 }}>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Your Cart</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`Items: ${data?.items?.length ?? 0}`}</Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
              <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 160 }}>Qty</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.items.map(item => (
              <TableRow key={item.productId} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: 1, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                      {item.productName?.[0] ?? ''}
                    </Box>
                    <Typography sx={{ fontWeight: 600 }}>{item.productName}</Typography>
                  </Box>
                </TableCell>

                <TableCell><Typography sx={{ fontWeight: 600 }}>{item.price}$</Typography></TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box onClick={() => decQty(item.productId)} sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1, cursor: 'pointer', border: '1px solid', borderColor: 'divider' }}>
                      <RemoveIcon sx={{ fontSize: 16 }} />
                    </Box>

                    <Box sx={{ px: 2, py: 0.4, minWidth: 36, textAlign: 'center', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography>{item.count}</Typography>
                    </Box>

                    <Box onClick={() => incQty(item.productId)} sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1, cursor: 'pointer', border: '1px solid', borderColor: 'divider' }}>
                      <AddIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>
                </TableCell>

                <TableCell><Typography sx={{ fontWeight: 700 }}>{item.totalPrice}$</Typography></TableCell>

                <TableCell>
                  <Button color="error" onClick={() => removeCartProduct(item.productId)} size="small" variant="text">Remove</Button>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} sx={{ pt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Cart</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Taxes & shipping at checkout</Typography>
              </TableCell>

              <TableCell colSpan={1} sx={{ pt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{data.cartTotal}$</Typography>
              </TableCell>

              <TableCell colSpan={1} sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button color="error" variant="contained" onClick={clearCart} size="small" sx={{ px: 1.5 }}>Clear</Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ width: 320, bgcolor: 'background.paper', color: 'text.primary', borderRadius: 2, p: 2, boxShadow: 1,display: 'flex', flexDirection: 'column', gap: 1, mb: 2}}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700,display:'flex',justifyContent:'center' }}>Checkout</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          {data.items.map(it => (
            <Box key={it.productId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${it.count} × ${it.price}$`}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{`${it.count * it.price}$`}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Subtotal</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{data.cartTotal}$</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Controller control={control} name="paymentMethod" defaultValue="Cash" render={({ field }) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box onClick={() => field.onChange('Cash')} sx={{ flex: 1, p: 1, textAlign: 'center', borderRadius: 1, cursor: 'pointer', border: field.value === 'Cash' ? '2px solid' : '1px solid', borderColor: field.value === 'Cash' ? 'primary.main' : 'divider', bgcolor: field.value === 'Cash' ? 'action.selected' : 'transparent', userSelect: 'none' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Cash</Typography>
              </Box>
              <Box onClick={() => field.onChange('Visa')} sx={{ flex: 1, p: 1, textAlign: 'center', borderRadius: 1, cursor: 'pointer', border: field.value === 'Visa' ? '2px solid' : '1px solid', borderColor: field.value === 'Visa' ? 'primary.main' : 'divider', bgcolor: field.value === 'Visa' ? 'action.selected' : 'transparent', userSelect: 'none' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Visa</Typography>
              </Box>
            </Box>
          )} />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>Create Order</Button>
        </Box>
      </Box>
    </Box>
  </TableContainer>
);
}
