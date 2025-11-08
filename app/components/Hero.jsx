"use client";
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: theme.spacing(4),
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          : 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
      }}
    >
      <Typography
        variant="h2"
        component={motion.h1}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          mb: 2,
        }}
      >
        Welcome to Ketra
      </Typography>
      <Typography
        variant="h5"
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        sx={{
          color: theme.palette.text.secondary,
          mb: 4,
          maxWidth: '600px',
        }}
      >
        Your ultimate studying companion. Boost your productivity and achieve your goals with ease.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        sx={{
          padding: theme.spacing(1.5, 4),
          fontSize: '1.1rem',
          borderRadius: theme.shape.borderRadius,
        }}
      >
        Get Started
      </Button>
    </Box>
  );
}
