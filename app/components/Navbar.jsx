"use client";
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from '../ThemeProvider';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();

    return (
            <AppBar
                position="sticky"
                component={motion.header}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    background: theme.palette.background.paper
                }}
                
            >
                <Toolbar className={"flex justify-between items-center"}>
                    <Typography
                        variant="h5"
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #00bcd4, #3f51b5)',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            minWidth: 'fit-content',
                        }}
                    >
                        <Link href="/">Ketra</Link>
                    </Typography>
                <Toolbar>
                    <IconButton onClick={toggleColorMode}>
                        {theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Toolbar>
            </Toolbar>
        </AppBar>
    );
}