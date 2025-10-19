import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function MainSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        height: { xs: '60vh', md: '80vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        mb: 4,
        borderRadius: 2,
        color: isDark ? '#fff' : '#000',
        background: isDark
          ? 'linear-gradient(-45deg, #000000, #111111, #222222, #000000)'
          : 'linear-gradient(-45deg, #ffffff, #e3f2fd, #bbdefb, #ffffff)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        '@global': {
          '@keyframes gradientBG': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, mb: 2, color: isDark ? '#fff' : theme.palette.primary.main }}
      >
        Welcome to MyStore
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 3, maxWidth: 600, color: isDark ? '#ccc' : '#555' }}
      >
        Discover amazing products at unbeatable prices. Shop the latest trends and enjoy a seamless online shopping experience.
      </Typography>

      <Button
        component={RouterLink}
        to="/shop"
        variant="contained"
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          bgcolor: isDark ? '#fff' : theme.palette.primary.main,
          color: isDark ? '#000' : '#fff',
          '&:hover': {
            bgcolor: isDark ? '#f0f0f0' : theme.palette.primary.dark,
            transform: 'scale(1.05)',
          },
          transition: '0.3s',
        }}
      >
        Shop Now
      </Button>
    </Box>
  );
}
