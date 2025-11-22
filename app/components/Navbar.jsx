"use client";
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SubjectIcon from '@mui/icons-material/Subject';
import NoteIcon from '@mui/icons-material/Note';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useColorMode } from '../ThemeProvider';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Link from 'next/link';

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(undefined);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return windowWidth;
}

const navItems = [
    { label: 'Home', href: '/', icon: <HomeIcon fontSize="small" /> },
    { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { label: 'Subjects', href: '/subjects', icon: <SubjectIcon fontSize="small" /> },
    { label: 'Notes', href: '/notes', icon: <NoteIcon fontSize="small" /> },
    { label: 'Quotes', href: '/quotes', icon: <FormatQuoteIcon fontSize="small" /> },
    { label: 'About', href: '/about', icon: <InfoIcon fontSize="small" /> },
];

export default function Navbar() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();
    const width = useWindowWidth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isMobile = width !== undefined && width <= 950;

    return (
        <AppBar
            position="sticky"
            component={motion.header}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            elevation={0}
            sx={{
                backdropFilter: 'blur(20px)',
                backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(18, 18, 18, 0.8)' 
                    : 'rgba(255, 255, 255, 0.8)',
                borderBottom: `1px solid ${theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.1)'}`,
            }}
        >
            <Toolbar className="flex justify-between items-center" sx={{ py: 1 }}>
                <Typography
                    variant="h5"
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        cursor: 'pointer',
                        fontWeight: 800,
                        fontSize: '1.75rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        minWidth: 'fit-content',
                        letterSpacing: '-0.02em',
                    }}
                >
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Ketra
                    </Link>
                </Typography>

                {isMobile ? (
                    <Box>
                        <IconButton
                            aria-label="menu"
                            aria-controls="navigation-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            color="inherit"
                            sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.1)' 
                                        : 'rgba(0, 0, 0, 0.05)',
                                }
                            }}
                        >
                            <MenuIcon color="action" />
                        </IconButton>
                        <Menu
                            id="navigation-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {navItems.map((item) => (
                                <MenuItem 
                                    key={item.href}
                                    onClick={handleClose} 
                                    component={Link} 
                                    href={item.href}
                                    sx={{
                                        gap: 1.5,
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === 'dark' 
                                                ? 'rgba(102, 126, 234, 0.15)' 
                                                : 'rgba(102, 126, 234, 0.1)',
                                        }
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </MenuItem>
                            ))}
                            <MenuItem 
                                onClick={() => { toggleColorMode(); handleClose(); }}
                                sx={{
                                    gap: 1.5,
                                    py: 1.5,
                                    borderTop: `1px solid ${theme.palette.mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.1)' 
                                        : 'rgba(0, 0, 0, 0.1)'}`,
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'dark' 
                                            ? 'rgba(102, 126, 234, 0.15)' 
                                            : 'rgba(102, 126, 234, 0.1)',
                                    }
                                }}
                            >
                                {theme.palette.mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                                {theme.palette.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.href}
                                component={Link}
                                href={item.href}
                                startIcon={item.icon}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    color: theme.palette.text.primary,
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'dark' 
                                            ? 'rgba(102, 126, 234, 0.15)' 
                                            : 'rgba(102, 126, 234, 0.1)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}

                        <IconButton 
                            onClick={toggleColorMode}
                            sx={{
                                ml: 1,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'dark' 
                                        ? 'rgba(102, 126, 234, 0.15)' 
                                        : 'rgba(102, 126, 234, 0.1)',
                                    transform: 'rotate(180deg)',
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            {theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}