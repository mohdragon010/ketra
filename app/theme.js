"use client";
import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",  // bright blue
      light: "#63a4ff", // lighter blue
      dark: "#004ba0",  // darker blue
    },
    secondary: {
      main: "#9c27b0",  // elegant purple
      light: "#d05ce3", // lighter purple
      dark: "#6a0080",  // darker purple
    },
    background: {
      default: "#f5f7fa", // soft gray background
      paper: "#ffffff",    // white cards, dialogs
    },
    text: {
      primary: "#1a1a1a", // near-black text
      secondary: "#4f4f4f", // muted gray text
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",  // gentle blue
      light: "#c3fdff", // softer light blue
      dark: "#42a5f5",  // stronger blue
    },
    secondary: {
      main: "#ce93d8",  // soft purple
      light: "#e1bee7", // lighter purple
      dark: "#ab47bc",  // deeper purple
    },
    background: {
      default: "#121212", // main app background
      paper: "#1c1c1c",   // cards, dialogs background
    },
    text: {
      primary: "#ffffff", // main text
      secondary: "#bdbdbd", // secondary muted text
    },
  },
});
