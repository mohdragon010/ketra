import Hero from './components/Hero.jsx';
import FeaturesShowCase from './components/FeaturesShowcase.jsx';
import Footer from './components/Footer.js';
import { Box } from '@mui/material';

export default function Home(){
  return(
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flex: 1 }}>
        <Hero />
        <FeaturesShowCase />
      </Box>
      <Footer />
    </Box>
  )
};
