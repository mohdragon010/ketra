"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Box,
  useTheme,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (quoteId) => {
    const newFavorites = favorites.filter((quote) => quote.id !== quoteId);
    setFavorites(newFavorites);
    localStorage.setItem("favoriteQuotes", JSON.stringify(newFavorites));
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "80vh",
          padding: theme.spacing(4),
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.text.primary, textAlign: 'center' }}
        >
          Favorite Quotes
        </Typography>

        {favorites.length > 0 ? (
          <List sx={{ width: "100%" }}>
            {favorites.map((quote) => (
              <ListItem
                key={quote.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFromFavorites(quote.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  marginBottom: theme.spacing(2),
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <ListItemText
                  primary={`"${quote.quote}"`}
                  secondary={`- ${quote.author}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ mt: 4, textAlign: 'center' }}>You have no favorite quotes yet.</Typography>
        )}

        <Box sx={{ mt: 4 }}>
          <Link href="/quotes" passHref>
            <Button variant="outlined" color="primary">
              Back to Random Quotes
            </Button>
          </Link>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Quote removed from favorites."
        />
      </Box>
    </Container>
  );
}
