"use client";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Home } from "@mui/icons-material";
import Link from "next/link";

export default function NotFound() {
const theme = useTheme();

return (
    <Box
    component={motion.div}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: theme.spacing(4),
        background: theme.palette.background.default,
    }}
    >
    <Typography
        variant="h1"
        component={motion.h1}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        sx={{
        fontWeight: 900,
        fontSize: { xs: "4rem", md: "6rem" },
        color: theme.palette.primary.main,
        mb: 2,
        }}
    >
        404
    </Typography>
    <Typography
        variant="h5"
        component={motion.p}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        sx={{
        color: theme.palette.text.secondary,
        mb: 4,
        maxWidth: "500px",
        }}
    >
        Oops! The page you're looking for doesn't exist.
    </Typography>
    <Link href="/">
        <Button
        variant="contained"
        color="primary"
        startIcon={<Home />}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        sx={{
            padding: theme.spacing(1.5, 4),
            fontSize: "1.1rem",
            borderRadius: theme.shape.borderRadius,
            fontWeight: 600,
        }}
        >
        Go Home
        </Button>
    </Link>
    </Box>
);
}
