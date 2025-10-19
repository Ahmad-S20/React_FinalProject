import { Box, Container, TextField, Typography ,Button,CircularProgress} from '@mui/material'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginSchema from '../../Validations/LoginSchema';
import { Link as LinkRouter, useNavigate,useOutletContext } from 'react-router-dom';
import styles from './Login.module.css'; // Import the CSS module
import axios from 'axios';

export default function Login() {
  //library used for validation (yup) https://github.com/jquense/yup
  //then downloading yup resolver (npm i @hookform/resolvers)
  // const schema = yup.object({
  //   fullName: yup.string().required('Full Name is required').min(3, 'Name must be at least 3 characters'),
  //   userName: yup.string().required('User Name is required'),
  //   email: yup.string().email('Invalid email').required('Email is required'),
  //   password: yup.string().required('Password is required'),
  //   phoneNumber: yup.string().required('Phone Number is required').min(10, 'Phone Number must be at least 10 characters'),
  // })
  
  const navigate = useNavigate();    
  const {setisLoggedIn} = useOutletContext();
  //library used for form handeling (react-hook-form) https://react-hook-form.com/docs/useform/register
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(LoginSchema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try{
      setIsLoading(true);
      const respons = await axios.post('https://kashop1.runasp.net/api/Identity/Account/Login',data);
      //console.log(respons);
     if(respons.status === 200){
      localStorage.setItem('token',respons.data.token);
      setisLoggedIn(true);
      navigate('/');
     }
    }catch(error){
      console.log(error);
    }finally
    {
      setIsLoading(false);
    }
  }

  return (
    <Box  py={4}>
      <Container maxWidth="lg" >
        <Typography component="h1" variant="h4">Login Page</Typography>
        <Box
        onSubmit={handleSubmit(onSubmit)} 
        component="form" sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}>
          <TextField 
           error={errors.email}
           helperText={errors.email?.message}
            {...register("email")} label="Email" variant="outlined" fullWidth />
          <TextField  {...register("password")}  error={errors.password}
           helperText={errors.password?.message} label="Password" variant="outlined" fullWidth />
          <div>
            <LinkRouter to="/forgot-password" >
              Forgot Password?
            </LinkRouter>
          </div>
          <Button  variant="contained" type="submit" disabled={isLoading}>{isLoading ? <CircularProgress color="secondary" /> : 'Login'}</Button>
           <Typography >
            Don't have an account?
            <LinkRouter to="/register" >Register here</LinkRouter>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
