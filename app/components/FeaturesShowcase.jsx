    "use client"
    import { Box, Container, Typography, useTheme } from '@mui/material';
    import { motion } from 'framer-motion';
    import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
    import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
    import EventNoteIcon from '@mui/icons-material/EventNote';
    import ColorLensIcon from '@mui/icons-material/ColorLens';
    import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
    import WorkspacePremium from '@mui/icons-material/WorkspacePremium';
    import { useState } from 'react';

    export default function FeaturesShowcase() {
    const theme = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const features = [
        {
        icon: <AutoAwesomeMotionIcon sx={{ fontSize: 36 }} />,
        title: 'Smooth Animations',
        description: 'Modern interface enhanced by subtle motion that makes studying feel alive and engaging.',
        color: '#FF6B6B',
        accentColor: '#FFB3B3',
        },
        {
        icon: <RocketLaunchIcon sx={{ fontSize: 36 }} />,
        title: 'Lightning Fast',
        description: 'Built for efficiency—loads instantly and stays responsive on any device.',
        color: '#00BCD4',
        accentColor: '#4DD0E1',
        },
        {
        icon: <EventNoteIcon sx={{ fontSize: 36 }} />,
        title: 'Smart Notes',
        description: 'Keep your materials structured, searchable, and instantly accessible whenever needed.',
        color: '#FFB74D',
        accentColor: '#FFCA64',
        },
        {
        icon: <WorkspacePremium sx={{ fontSize: 36 }} />,
        title:"Completly Free",
        description:"Enjoy every feature of Ketra without limits or hidden costs — learning and productivity should never be paywalled.",
        color: '#81C784',
        accentColor: '#A5D6A7',
        },
        {
        icon: <ColorLensIcon sx={{ fontSize: 36 }} />,
        title: 'Adaptive Themes',
        description: 'Seamlessly switch between light and dark modes for maximum comfort.',
        color: '#BA68C8',
        accentColor: '#CE93D8',
        },
        {
        icon: <FormatQuoteIcon sx={{ fontSize: 36 }} />,
        title: "Daily Quotes",
        description:"Stay motivated with a fresh quote every day, keeping your mind focused and inspired while you study.",
        color: '#42A5F5',
        accentColor: '#64B5F6',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
        },
    };

    return (
        <Box
        id="features"
        sx={{
            py: 14,
            position: 'relative',
            overflow: 'hidden',
            background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0a0e27 0%, #16213e 50%, #0a0e27 100%)'
            : 'linear-gradient(180deg, #fafbfc 0%, #f3f4f6 50%, #fafbfc 100%)',
        }}
        >
        {/* Floating background elements */}
        <Box
            component={motion.div}
            animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
            position: 'absolute',
            top: '5%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 107, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            }}
        />
        <Box
            component={motion.div}
            animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            sx={{
            position: 'absolute',
            bottom: '5%',
            left: '8%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(66, 165, 245, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            >
            {/* Header */}
            <Box
                component={motion.div}
                variants={itemVariants}
                sx={{ textAlign: 'center', mb: 12 }}
            >
                <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: `linear-gradient(120deg, ${theme.palette.primary.main}, #BA68C8, #42A5F5)`,
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    fontSize: { xs: '2.2rem', md: '3.5rem' },
                    letterSpacing: '-0.5px',
                }}
                >
                Why Choose Ketra?
                </Typography>
                <Typography
                variant="body1"
                sx={{
                    color: theme.palette.mode === 'dark' ? '#a0aec0' : '#718096',
                    maxWidth: 600,
                    mx: 'auto',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                }}
                >
                Built for students who demand more. Speed, elegance, and intelligence in one platform.
                </Typography>
            </Box>

            {/* Features */}
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 4,
                mb: 8,
                }}
            >
                {features.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                    <Box
                    sx={{
                        height: '100%',
                        p: 5,
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: hoveredIndex === index ? feature.color : (theme.palette.mode === 'dark' ? '#2d3748' : '#e2e8f0'),
                        background: theme.palette.mode === 'dark'
                        ? 'rgba(30, 41, 59, 0.4)'
                        : 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: hoveredIndex === index
                        ? `0 0 30px ${feature.color}20, 0 8px 24px ${feature.color}15`
                        : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                    }}
                    >
                    {/* Background glow on hover */}
                    {hoveredIndex === index && (
                        <Box
                        sx={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-30%',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${feature.color}15, transparent 70%)`,
                            pointerEvents: 'none',
                        }}
                        />
                    )}

                    {/* Icon */}
                    <Box
                        component={motion.div}
                        animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        rotate: hoveredIndex === index ? 5 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        sx={{
                        width: 'fit-content',
                        p: 2,
                        borderRadius: '14px',
                        background: `${feature.color}12`,
                        border: `2px solid ${feature.color}30`,
                        color: feature.color,
                        fontSize: '2rem',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        {feature.icon}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 1,
                            fontSize: '1.1rem',
                        }}
                        >
                        {feature.title}
                        </Typography>
                        <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#6b7280',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                        }}
                        >
                        {feature.description}
                        </Typography>
                    </Box>

                    {/* Animated underline */}
                    <motion.div
                        animate={{
                        scaleX: hoveredIndex === index ? 1 : 0,
                        opacity: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 70 }}
                        style={{
                        height: '3px',
                        background: `linear-gradient(90deg, ${feature.color}, ${feature.accentColor})`,
                        borderRadius: '2px',
                        transformOrigin: 'left',
                        }}
                    />
                    </Box>
                </motion.div>
                ))}
            </Box>

            {/* Call to action text */}
            <Box
                component={motion.div}
                variants={itemVariants}
                sx={{ textAlign: 'center', mt: 4 }}
            >
                <Typography
                variant="caption"
                sx={{
                    color: theme.palette.mode === 'dark' ? '#64748b' : '#9ca3af',
                    fontSize: '0.9rem',
                }}
                >
                Trusted by students worldwide • Zero setup required
                </Typography>
            </Box>
            </motion.div>
        </Container>
        </Box>
    );
    }