"use client"
import {useMemo,useState,useEffect,createContext,useContext} from 'react';
import { createTheme,ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeProvider({ children }){
    const [mode, setMode] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        const savedMode = localStorage.getItem('themeMode');
        return savedMode === "light" || savedMode === "dark" ? savedMode : "dark";
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    },[mode]);
    
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prev => (prev === "light" ? "dark" : "light"));
            }
        }),[]
    );

    const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

    return(
        <ColorModeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    {children}
                </CssBaseline>
            </MuiThemeProvider>
        </ColorModeContext.Provider>
    )
}