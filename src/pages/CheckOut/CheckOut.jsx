// import { useQuery } from '@tanstack/react-query';
// import React from 'react'
// import AxiosUsersInstance from '../../API/AxiosUsersInstance';
// import { Box, Card, CardContent, CircularProgress, Typography,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio, Button  } from '@mui/material';
// import { Controller, useForm } from 'react-hook-form';

// export default function CheckOut() {

//     const fetchCartProducts = async () => {
//     const response = await AxiosUsersInstance.get('/Carts');
//     return response.data;
//   }
  
//   const {register,handleSubmit,control} = useForm({});
//   const onSubmit = async (formData)=>{
//     //console.log(formData.paymentMethod);
//     try {
//         const response = await AxiosUsersInstance.post(`https://kashop11.runasp.net/api/Customer/CheckOut/payment`,{
//             paymentMethod: formData.paymentMethod});
//     if(response.status === 200){
//         console.log(response.data.url);
//         location.href = response.data.url;
//     }
//     } catch (error) {
//             console.log(error);
//     }

//   }
//   const {data,isLoading,error,isError} = useQuery({
//     queryKey: ['cartProducts'],
//     queryFn: fetchCartProducts,
//     staleTime: 1000 * 60 * 5,
//   });
//   const cartProducts = data?.items;
//   console.log(cartProducts);

//     if(isError){return <div>Error: {error.message}</div>}
//     if(isLoading) return <CircularProgress/>
//   return (
//     <Box py={5}>
//         <Typography variant='h4'>Checkout</Typography>
//         {cartProducts.map(item=>(
//             <Card key={item.productId} sx={{mb:3}}>
//                 <CardContent sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
//                     <Typography variant='h6'>{item.productName}</Typography>
//                     <Typography>{item.count} * {item.price}$ = {item.count * item.price}$</Typography>
//                 </CardContent>
//             </Card>
//         ))}
//         <Typography variant='h6' mt={2}>Total: {data.cartTotal}$</Typography>

//         <Box onSubmit={handleSubmit(onSubmit)} 
//         component="form" sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           mt: 4,
//         }}>
//            <Controller
//             control={control}
//             name='paymentMethod'
//             defaultValue={'Cahs'}
//             render={({ field }) =>(
//                 <Box>
//                     <FormLabel>Payment Method</FormLabel>
//                     <RadioGroup {...field}>
//                         <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
//                         <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
//                     </RadioGroup>
//                 </Box>
//             )}
//             />
//             <Button type='submit' variant='contained'>Create Order</Button>
//         </Box>

//     </Box>
//   )
// }
