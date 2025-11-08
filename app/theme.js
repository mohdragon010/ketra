"use client";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",    // vivid ocean blue
      light: "#60a5fa",   // lighter sky blue
      dark: "#1e40af",    // deep navy
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f43f5e",    // warm coral-red
      light: "#fb7185",
      dark: "#be123c",
      contrastText: "#ffffff",
    },
    tertiary: {
      main: "#8b5cf6",    // vibrant purple for hero accents
      light: "#a78bfa",
      dark: "#7c3aed",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fafafa", // soft paper white
      paper: "#ffffff",   // clean surfaces
    },
    text: {
      primary: "#111827", // near-black
      secondary: "#4b5563", // medium gray
    },
    divider: "#e5e7eb", // subtle gray divider
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h5: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shadows: Array(25).fill("none"), // optional: flat design aesthetic
});


export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",   // bright azure
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#f9fafb",
    },
    secondary: {
      main: "#ec4899",   // neon pink accent
      light: "#f472b6",
      dark: "#be185d",
      contrastText: "#f9fafb",
    },
    tertiary: {
      main: "#a855f7",   // vibrant purple for hero accents
      light: "#c084fc",
      dark: "#9333ea",
      contrastText: "#f9fafb",
    },
    background: {
      default: "#0d1117", // GitHub-like dark base
      paper: "#161b22",   // slightly lighter panels
    },
    text: {
      primary: "#e5e7eb",  // off-white
      secondary: "#9ca3af", // cool gray
    },
    divider: "#2d333b",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h5: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shadows: Array(25).fill("none"),
});
