import { Box, Container, TextField, Typography ,Button,CircularProgress} from '@mui/material'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../Validations/RegisterSchema';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import axios from 'axios';

export default function Register() {
  //library used for validation (yup) https://github.com/jquense/yup
  //then downloading yup resolver (npm i @hookform/resolvers)
  // const schema = yup.object({
  //   fullName: yup.string().required('Full Name is required').min(3, 'Name must be at least 3 characters'),
  //   userName: yup.string().required('User Name is required'),
  //   email: yup.string().email('Invalid email').required('Email is required'),
  //   password: yup.string().required('Password is required'),
  //   phoneNumber: yup.string().required('Phone Number is required').min(10, 'Phone Number must be at least 10 characters'),
  // })
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  //library used for form handeling (react-hook-form) https://react-hook-form.com/docs/useform/register
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try{
      setIsLoading(true);
      const respons = await axios.post('https://kashop1.runasp.net/api/Identity/Account/Register',data);
      if(respons.status === 200){
        navigate('/login');
      }
    }catch(error){
      if(error.response.status){
        setServerError(error.response.data.message);
      }
      else
      {
        setServerError("An unexpected error occurred. Please try again later");
      }
    }finally
    {
      setIsLoading(false);
    }
  }

  return (
    <Box  py={4}>
      <Container maxWidth="lg" 
      //className={styles.registerForm}
       >
        <Typography
         //className={styles.title}
          component="h1" variant="h4">Register Page</Typography>
        <Box
         //className={styles.formCard}
        onSubmit={handleSubmit(onSubmit)} 
        component="form" sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}>
          {serverError && (<Typography color='error'>{serverError}</Typography>)}
          <TextField {...register("fullName")}
           label="Full Name" variant="outlined"  fullWidth
           error={errors.fullName}
           helperText={errors.fullName?.message}
             //className={styles.inputField}
              />
          <TextField {...register("userName")} label="User Name" variant="outlined"
             //className={styles.inputField} 
          error={errors.userName}
           helperText={errors.userName?.message}
          fullWidth />
          <TextField {...register("email")} label="Email" variant="outlined" 
          error={errors.email}
          helperText={errors.email?.message}
          //className={styles.inputField}
           fullWidth />
          <TextField {...register("phoneNumber")} label="Phone Number" variant="outlined" 
           error={errors.phoneNumber}
           helperText={errors.phoneNumber?.message}
         // className={styles.inputField}
           fullWidth />
          <TextField {...register("password")} label="Password" variant="outlined" 
           error={errors.password}
           helperText={errors.password?.message}
          //className={styles.inputField}
           fullWidth />
          <Button
          //className={styles.submitBtn}
          variant="contained" type="submit" disabled={isLoading}>{isLoading ? <CircularProgress color="secondary" /> : 'Register'}</Button>
        </Box>
      </Container>
    </Box>
  )
}
