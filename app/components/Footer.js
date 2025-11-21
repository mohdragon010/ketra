"use client"
import { Box, Container, Typography, Link, IconButton, Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import MenuBookIcon from '@mui/icons-material/MenuBook'; 
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StickyNote2Icon from '@mui/icons-material/StickyNote2'; 
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoIcon from '@mui/icons-material/Info';


export default function Footer() {
  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
    { name: 'Subjects', path: '/subjects', icon: MenuBookIcon },
    { name: 'Notes', path: '/notes', icon: StickyNote2Icon },
    { name: 'Quotes', path: '/quotes', icon: AutoAwesomeIcon },
    { name: 'About', path: '/about', icon: InfoIcon },
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/mohdragon010',
      icon: GitHubIcon,
      color: '#333'
    },
    { 
      name: 'Email', 
      url: 'mailto:mohammed.ayman152433@gmail.com',
      icon: MailIcon,
      color: '#EA4335'
    },
    { 
      name: 'WhatsApp', 
      url: 'https://wa.me/+201027118875',
      icon: WhatsAppIcon,
      color: '#25D366'
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/mohamed.ayman.119778/',
      icon: FacebookIcon,
      color: '#1877F2'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(18,18,18,0.8) 0%, rgba(18,18,18,1) 100%)'
            : 'linear-gradient(180deg, rgba(250,250,250,0.8) 0%, rgba(255,255,255,1) 100%)',
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: (theme) => 
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(99,102,241,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: (theme) => 
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0) 70%)'
              : 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, rgba(168,85,247,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          sx={{ py: 6 }}
        >
          <Grid container spacing={4} justifyContent="space-between">
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Box component={motion.div} variants={itemVariants}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  Ketra 📚
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, maxWidth: 280 }}
                >
                  Your ultimate study companion. Stay organized, focused, and productive. ✨
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['⚡', '🔒', '💎'].map((emoji, index) => (
                    <Box
                      key={emoji}
                      component={motion.div}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      <Typography variant="h6">{emoji}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={4}>
              <Box component={motion.div} variants={itemVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Box
                        key={link.path}
                        component={motion.div}
                        whileHover={{ x: 4 }}
                      >
                        <Link
                          href={link.path}
                          underline="none"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: 'text.secondary',
                            transition: 'all 0.2s',
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          <Icon sx={{ fontSize: 16 }} />
                          <Typography variant="body2">{link.name}</Typography>
                        </Link>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>

            {/* Connect Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Box component={motion.div} variants={itemVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Let&apos;s Connect 🤝
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Box
                        key={social.name}
                        component={motion.div}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -10, 10, -10, 0],
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconButton
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.05)'
                                : 'rgba(0,0,0,0.04)',
                            '&:hover': {
                              bgcolor: `${social.color}15`,
                              color: social.color,
                            },
                            transition: 'all 0.3s',
                          }}
                        >
                          <Icon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>
                    );
                  })}
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 2 }}
                >
                  Built with ❤️ by Mohammed Ayman
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, opacity: 0.6 }} />

          {/* Bottom Bar */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              © 2025 Ketra. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                Made with
                <Box
                  component={motion.span}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  💜
                </Box>
                for students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}