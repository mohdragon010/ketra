"use client";
import { Container, Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to Ketra
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a sample page to demonstrate theme switching with Material-UI in a Next.js application.
      </Typography>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
    </Container>
  );
}
