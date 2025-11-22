'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  Avatar,
  Chip,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PaletteIcon from '@mui/icons-material/Palette';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from '../components/Footer.js';

export default function AboutPage() {
  const theme = useTheme();

  const features = [
    {
      icon: <TaskAltIcon sx={{ fontSize: 48 }} />,
      title: 'Smart Tasks',
      description: 'Organize your assignments and deadlines with an intuitive task management system.',
      color: '#f43f5e',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 48 }} />,
      title: 'Organized Subjects',
      description: 'Keep all your courses and materials structured in one place.',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <NoteAltIcon sx={{ fontSize: 48 }} />,
      title: 'Clean Notes',
      description: 'Take beautiful notes with a rich text editor designed for students.',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <FormatQuoteIcon sx={{ fontSize: 48 }} />,
      title: 'Daily Quotes',
      description: 'Stay motivated with inspiring quotes to fuel your study sessions.',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  const techStack = [
    { name: 'Next.js 16', icon: <RocketLaunchIcon /> },
    { name: 'React 19', icon: <CodeIcon /> },
    { name: 'Material-UI', icon: <PaletteIcon /> },
    { name: 'Tiptap Editor', icon: <NoteAltIcon /> },
    { name: 'Framer Motion', icon: <AutoAwesomeIcon /> },
  ];

  const stats = [
    { label: 'Fast', value: '⚡', description: 'Lightning-fast performance' },
    { label: 'Secure', value: '🔒', description: 'Your data stays local' },
    { label: 'Modern', value: '✨', description: 'Built with latest tech' },
    { label: 'Free', value: '💎', description: 'Always free to use' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
        {/* Hero Section with Animated Background */}
        <Box sx={{ textAlign: 'center', mb: 12, position: 'relative' }}>
          {/* Animated Background Blobs */}
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              left: '10%',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              opacity: 0.1,
              filter: 'blur(60px)',
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-30px)' },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: '10%',
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              opacity: 0.1,
              filter: 'blur(60px)',
              animation: 'float 8s ease-in-out infinite',
              animationDelay: '1s',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                  },
                }}
              >
                <Typography sx={{ fontSize: '3rem' }}>📚</Typography>
              </Box>
            </Box>

            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                mb: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              What is Ketra?
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.8,
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
              }}
            >
              Ketra is a <strong style={{ color: theme.palette.primary.main }}>modern study dashboard</strong> that helps students stay organized, focused, and productive. 🚀
            </Typography>

            {/* Stats Row */}
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ mt: 6, gap: 2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <Tooltip title={stat.description} arrow>
                    <Card
                      elevation={3}
                      sx={{
                        px: 3,
                        py: 2,
                        minWidth: 120,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px) scale(1.05)',
                          boxShadow: 8,
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>{stat.value}</Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {stat.label}
                      </Typography>
                    </Card>
                  </Tooltip>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Box>

        {/* Mission Section with Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: 12, maxWidth: 900, mx: 'auto' }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                mb: 2,
                textAlign: 'center',
                color: theme.palette.text.primary,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Our Mission 🎯
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 6, fontSize: '1.1rem' }}
            >
              Building the ultimate study companion for modern students
            </Typography>

            <Card
              elevation={4}
              sx={{
                p: 5,
                borderRadius: 4,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack spacing={4}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      minWidth: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    📖
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}
                  >
                    Students today need more than a basic to-do list. Between lectures, assignments, exams, and personal projects,
                    staying organized can feel <strong>overwhelming</strong>.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      minWidth: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    ✨
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}
                  >
                    Ketra brings <strong>tasks, subjects, notes, and motivation</strong> into one clean workspace. Everything you need to succeed
                    academically, without the clutter or complexity.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      minWidth: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    ⚡
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}
                  >
                    <strong>Fast, simple, and designed for real daily use.</strong> Because your time is valuable, and your tools should work as
                    hard as you do.
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Box>
        </motion.div>

        {/* Feature Highlights with Gradients */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: 12 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                mb: 2,
                textAlign: 'center',
                color: theme.palette.text.primary,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Key Features ✨
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 6, fontSize: '1.1rem' }}
            >
              Everything you need to excel in your studies
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10 }}
                  >
                    <Card
                      elevation={4}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: `0 20px 40px ${feature.color}40`,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: feature.gradient,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          textAlign: 'center',
                          p: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '20px',
                            background: feature.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            mb: 1,
                            boxShadow: `0 10px 30px ${feature.color}40`,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          sx={{ fontWeight: 700, mb: 1 }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.7 }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: 12, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                mb: 2,
                color: theme.palette.text.primary,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Built With Modern Tech 🛠️
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 6, fontSize: '1.1rem' }}
            >
              Powered by the latest and greatest technologies
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ gap: 2 }}
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Chip
                    icon={tech.icon}
                    label={tech.name}
                    sx={{
                      px: 2,
                      py: 3,
                      fontSize: '1rem',
                      fontWeight: 600,
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(102, 126, 234, 0.2)'
                        : 'rgba(102, 126, 234, 0.1)',
                      border: `2px solid ${theme.palette.primary.main}`,
                      '&:hover': {
                        background: theme.palette.primary.main,
                        color: '#fff',
                        '& .MuiChip-icon': {
                          color: '#fff',
                        },
                      },
                      transition: 'all 0.3s',
                    }}
                  />
                </motion.div>
              ))}
            </Stack>
          </Box>
        </motion.div>

        {/* Developer Section - EPIC VERSION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card
            elevation={8}
            sx={{
              mb: 8,
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
            }}
          >
            {/* Decorative Background */}
            <Box
              sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                opacity: 0.1,
                filter: 'blur(60px)',
              }}
            />

            <CardContent sx={{ p: { xs: 4, md: 8 }, position: 'relative', zIndex: 1 }}>
              <Grid container spacing={6} alignItems="center">
                {/* Left Side - Avatar & Info */}
                <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Avatar
                      sx={{
                        width: 180,
                        height: 180,
                        mx: 'auto',
                        mb: 3,
                        fontSize: '5rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
                        border: `4px solid ${theme.palette.background.paper}`,
                      }}
                    >
                      👨‍💻
                    </Avatar>
                  </motion.div>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Mohammed Ayman
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 3, fontWeight: 500 }}
                  >
                    Self-Taught Front-End Developer
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Chip
                      icon={<CodeIcon />}
                      label="React Expert"
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<FavoriteIcon />}
                      label="UI/UX Lover"
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Stack>
                </Grid>

                {/* Right Side - Description & Links */}
                <Grid item xs={12} md={7}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 3 }}
                  >
                    About the Creator 🚀
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontSize: '1.125rem',
                      lineHeight: 1.8,
                      mb: 4,
                    }}
                  >
                    Hey there! I'm Mohammed, a passionate <strong>self-taught front-end developer</strong> who loves crafting
                    beautiful and functional web experiences. Ketra was born from my own struggles with staying organized during
                    my studies. I believe that <strong>great tools should be simple, fast, and delightful to use</strong>.
                    When I'm not coding, you'll find me exploring new technologies and building cool stuff! 💻✨
                  </Typography>

                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Let's Connect! 🤝
                  </Typography>

                  {/* Social Links - Beautiful Buttons */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GitHubIcon />}
                        href="https://github.com/mohdragon010"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #24292e 0%, #000 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #000 0%, #24292e 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        GitHub
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<EmailIcon />}
                        href="mailto:mohammed.ayman152433@gmail.com"
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #ea4335 0%, #c5221f 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #c5221f 0%, #ea4335 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        Email Me
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<WhatsAppIcon />}
                        href="https://wa.me/+201027118875"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #128C7E 0%, #25D366 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        WhatsApp
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<FacebookIcon />}
                        href="https://www.facebook.com/mohamed.ayman.119778/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #1877f2 0%, #0c63d4 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #0c63d4 0%, #1877f2 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        Facebook
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}