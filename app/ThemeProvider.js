"use client"
import {useMemo,useState,useEffect,createContext,useContext} from 'react';
import { createTheme,ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeProvider({ children }){
    const [mode, setMode] = useState("dark")

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode');
        if(savedMode === "light" || savedMode === "dark"){
            setMode(savedMode);
        }
    },[]);

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