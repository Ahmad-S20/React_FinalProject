import { Box, Container, TextField, Typography, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Validation schema using yup
const ForgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Handle form state and validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://kashop1.runasp.net/api/Identity/Account/forgot-password', {
        email: data.email,
      });

      if (response.status === 200) {
        setMessage('Password reset link has been sent to your email.');
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box py={4}>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h4" align="center">
          Forgot Password
        </Typography>
        
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 4,
            maxWidth: 400,
            margin: 'auto',
          }}
        >
          <TextField
            error={errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            label="Email"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress color="secondary" size={24} /> : 'Send Reset Link'}
          </Button>
          
          {message && (
            <Typography sx={{ mt: 2, textAlign: 'center', color: message.includes('error') ? 'red' : 'green' }}>
              {message}
            </Typography>
          )}

          <Typography sx={{ mt: 2 }} align="center">
            Remembered your password?{' '}
            <LinkRouter to="/login" style={{ textDecoration: 'none' }}>
              Login here
            </LinkRouter>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
