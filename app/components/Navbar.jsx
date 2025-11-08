"use client";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useColorMode } from '../ThemeProvider';

export default function Navbar() {
    const { toggleColorMode } = useColorMode();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ketra
                </Typography>
                <Button color="inherit" onClick={toggleColorMode}>
                    Toggle Theme
                </Button>
            </Toolbar>
        </AppBar>
    );
}