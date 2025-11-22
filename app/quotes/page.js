"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
Container,
Typography,
Button,
Box,
Card,
CardContent,
CircularProgress,
useTheme,
IconButton,
Snackbar,
Chip,
Stack,
Tooltip,
Paper,
Fade,
Zoom,
Alert,
Menu,
MenuItem,
ListItemIcon,
ListItemText,
Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TwitterIcon from "@mui/icons-material/Twitter";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DownloadIcon from "@mui/icons-material/Download";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Link from "next/link";
import { offlineQuotes } from "./offlineQuotes";

const CATEGORIES = [
{ id: 'all', label: '✨ All', color: '#8b5cf6' },
{ id: 'motivational', label: '🔥 Motivational', color: '#f43f5e' },
{ id: 'wisdom', label: '🧠 Wisdom', color: '#3b82f6' },
{ id: 'success', label: '🎯 Success', color: '#10b981' },
{ id: 'life', label: '🌟 Life', color: '#f59e0b' },
{ id: 'love', label: '❤️ Love', color: '#ec4899' },
{ id: 'inspirational', label: '💡 Inspirational', color: '#06b6d4' },
];

const QUOTE_APIS = [
{ url: 'https://api.quotable.io/random', transform: (data) => ({ id: data._id, quote: data.content, author: data.author }) },
{ url: 'https://motivational-spark-api.vercel.app/api/quotes/random', transform: (data) => data },
{ url: 'https://zenquotes.io/api/random', transform: (data) => ({ id: Date.now(), quote: data[0].q, author: data[0].a }) },
];

export default function Quotes() {
const [quote, setQuote] = useState(null);
const [loading, setLoading] = useState(true);
const [favorites, setFavorites] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('all');
const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
const [shareMenuAnchor, setShareMenuAnchor] = useState(null);
const [stats, setStats] = useState({ totalViewed: 0, totalFavorites: 0 });
const [isReading, setIsReading] = useState(false);
const [gradientIndex, setGradientIndex] = useState(0);
const cardRef = useRef(null);
const theme = useTheme();

const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
];

useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    const storedStats = JSON.parse(localStorage.getItem("quoteStats")) || { totalViewed: 0, totalFavorites: storedFavorites.length };
    setFavorites(storedFavorites);
    setStats(storedStats);


    setQuote(getRandomOfflineQuote());
    setLoading(false);

    setTimeout(() => fetchQuote(), 100);
}, []);

const getRandomOfflineQuote = () => {
    const randomIndex = Math.floor(Math.random() * offlineQuotes.length);
    return offlineQuotes[randomIndex];
};

const fetchQuote = async (category = selectedCategory) => {
    setLoading(true);
    setGradientIndex((prev) => (prev + 1) % gradients.length);

    try {

    const api = QUOTE_APIS[0]; 
    const url = category !== 'all' ? `${api.url}?tags=${category}` : api.url;

    const res = await fetch(url,);

    if (res.ok) {
        const rawData = await res.json();
        const data = api.transform(rawData);
        setQuote(data);
        updateStats('viewed');
    } else {
        throw new Error("API failed");
    }
    } catch (error) {
    console.error("Failed to fetch quote:", error);
    setQuote(getRandomOfflineQuote());
    updateStats('viewed');
    } finally {
    setLoading(false);
    }
};

const updateStats = (type) => {
    setStats(prev => {
    const newStats = {
        ...prev,
        totalViewed: type === 'viewed' ? prev.totalViewed + 1 : prev.totalViewed,
        totalFavorites: type === 'favorite' ? prev.totalFavorites + 1 : prev.totalFavorites,
    };
    localStorage.setItem("quoteStats", JSON.stringify(newStats));
    return newStats;
    });
};

const addToFavorites = () => {
    if (quote && !favorites.some((fav) => fav.id === quote.id)) {
    const newFavorites = [...favorites, quote];
    setFavorites(newFavorites);
    localStorage.setItem("favoriteQuotes", JSON.stringify(newFavorites));
    updateStats('favorite');
    showSnackbar('Quote added to favorites! ❤️', 'success');
    }
};

const copyToClipboard = () => {
    if (quote) {
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
    showSnackbar('Copied to clipboard! 📋', 'success');
    }
};


const readQuote = () => {
    if ('speechSynthesis' in window && quote) {
    if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
    } else {
        const utterance = new SpeechSynthesisUtterance(`${quote.quote} by ${quote.author}`);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
    }
    } else {
    showSnackbar('Text-to-speech not supported', 'error');
    }
};

const downloadAsImage = async () => {
    if (!cardRef.current) return;

    try {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
    });

    const link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL();
    link.click();
    showSnackbar('Quote downloaded! 📥', 'success');
    } catch (error) {
    showSnackbar('Download failed. Please try again.', 'error');
    }
};

const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
};

const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
};

const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchQuote(categoryId);
};

const isFavorite = quote && favorites.some((fav) => fav.id === quote.id);

return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
    {/* Header with Stats */}
    <Box sx={{ textAlign: 'center', mb: 4 }}>
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
        <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
            fontWeight: 900,
            background: gradients[gradientIndex],
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2,
            }}
        >
            ✨ Quotes Generator ✨
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Discover wisdom, inspiration, and motivation
        </Typography>
        </motion.div>

        {/* Stats */}
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4 }}>
        <Chip
            icon={<TrendingUpIcon />}
            label={`${stats.totalViewed} Quotes Viewed`}
            color="primary"
            variant="outlined"
        />
        <Chip
            icon={<FavoriteIcon />}
            label={`${stats.totalFavorites} Favorites`}
            color="secondary"
            variant="outlined"
        />
        </Stack>

        {/* Category Filters */}
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ gap: 1 }}>
        {CATEGORIES.map((category) => (
            <Chip
            key={category.id}
            label={category.label}
            onClick={() => handleCategoryChange(category.id)}
            sx={{
                backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                color: selectedCategory === category.id ? '#fff' : theme.palette.text.primary,
                border: `2px solid ${category.color}`,
                fontWeight: 600,
                transition: 'all 0.3s',
                '&:hover': {
                backgroundColor: category.color,
                color: '#fff',
                transform: 'translateY(-2px)',
                },
            }}
            />
        ))}
        </Stack>
    </Box>

    {/* Quote Card */}
    <Box
        sx={{
        position: 'relative',
        width: '100%',
        minHeight: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 4,
        }}
    >
        <AnimatePresence mode="wait">
        {loading ? (
            <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            >
            <CircularProgress size={60} thickness={4} />
            </motion.div>
        ) : quote ? (
            <motion.div
            key={quote.id}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.6, type: 'spring' }}
            style={{ width: '100%' }}
            >
            <Card
                ref={cardRef}
                elevation={8}
                sx={{
                width: '100%',
                background: gradients[gradientIndex],
                position: 'relative',
                overflow: 'visible',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark'
                    ? 'rgba(0,0,0,0.6)'
                    : 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(10px)',
                },
                }}
            >
                <CardContent sx={{ position: 'relative', zIndex: 1, p: 5 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <AutoAwesomeIcon
                    sx={{
                        fontSize: 40,
                        color: theme.palette.primary.main,
                        mb: 2,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.5 },
                        },
                    }}
                    />
                    <Typography
                    variant="h4"
                    component="p"
                    sx={{
                        fontStyle: 'italic',
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        mb: 3,
                        lineHeight: 1.6,
                        position: 'relative',
                    }}
                    >
                    {quote.quote}
                    </Typography>
                    <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                    }}
                    >
                    — {quote.author}
                    </Typography>
                </Box>
                </CardContent>
            </Card>
            </motion.div>
        ) : (
            <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
            <Alert severity="error" sx={{ fontSize: '1.1rem' }}>
                Could not fetch a quote. Please try again.
            </Alert>
            </motion.div>
        )}
        </AnimatePresence>
    </Box>

    {/* Action Buttons */}
    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ mb: 4, gap: 2 }}>
        <Tooltip title="Generate New Quote">
        <Button
            variant="contained"
            size="large"
            startIcon={<RefreshIcon />}
            onClick={() => fetchQuote()}
            disabled={loading}
            sx={{
            background: gradients[gradientIndex],
            color: '#fff',
            fontWeight: 700,
            px: 4,
            py: 1.5,
            transition: 'all 0.3s',
            '&:hover': {
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: 6,
            },
            }}
        >
            {loading ? 'Loading...' : 'New Quote'}
        </Button>
        </Tooltip>

        <Tooltip title={isFavorite ? 'Already in Favorites' : 'Add to Favorites'}>
        <span>
            <IconButton
            onClick={addToFavorites}
            disabled={!quote || isFavorite}
            sx={{
                backgroundColor: isFavorite ? theme.palette.secondary.main : theme.palette.background.paper,
                color: isFavorite ? '#fff' : theme.palette.secondary.main,
                height:"50px",width:"50px",
                border: `2px solid ${theme.palette.secondary.main}`,
                '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: '#fff',
                transform: 'scale(1.1)',
                },
                transition: 'all 0.3s',
            }}
            >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
        </span>
        </Tooltip>


        <Tooltip title={isReading ? 'Stop Reading' : 'Read Aloud'}>
        <IconButton
            onClick={readQuote}
            disabled={!quote}
            sx={{
            backgroundColor: isReading ? theme.palette.success.main : theme.palette.background.paper,
            color: isReading ? '#fff' : theme.palette.success.main,
            border: `2px solid ${theme.palette.success.main}`,
            width:"50px",height:"50px",
            '&:hover': {
                backgroundColor: theme.palette.success.main,
                color: '#fff',
                transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
            }}
        >
            <VolumeUpIcon />
        </IconButton>
        </Tooltip>

        <Tooltip title="Download as Image">
        <IconButton
            onClick={downloadAsImage}
            disabled={!quote}
            sx={{
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.warning.main}`,
            width:"50px",height:"50px",
            '&:hover': {
                backgroundColor: theme.palette.warning.main,
                color: '#fff',
                transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
            }}
        >
            <DownloadIcon />
        </IconButton>
        </Tooltip>

        <Tooltip title="Copy to Clipboard">
        <IconButton
            onClick={copyToClipboard}
            disabled={!quote}
            sx={{
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.info.main}`,
            width:"50px",height:"50px",
            '&:hover': {
                backgroundColor: theme.palette.info.main,
                color: '#fff',
                transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
            }}
        >
            <ContentCopyIcon />
        </IconButton>
        </Tooltip>
    </Stack>

    {/* View Favorites Link */}
    <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Link href="/quotes/favorites" passHref style={{ textDecoration: 'none' }}>
        <Button
            variant="outlined"
            size="large"
            startIcon={<FavoriteIcon />}
            sx={{
            borderWidth: 2,
            fontWeight: 600,
            '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
            },
            }}
        >
            View Favorites ({favorites.length})
        </Button>
        </Link>
    </Box>

    {/* Snackbar */}
    <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
        </Alert>
    </Snackbar>
    </Container>
);
}