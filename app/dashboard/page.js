import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          TODO: Dashboard content coming soon...
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}