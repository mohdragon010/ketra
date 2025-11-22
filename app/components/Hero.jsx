"use client";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Book,
  School,
  PlayArrow,
  Explore,
  People,
  LibraryBooks
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const theme = useTheme();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = [...Array(20)];
    setParticles(generated);
  }, []);

  const stats = [
    { icon: People, label: "10,000+ Students", value: "10,000+" },
    { icon: LibraryBooks, label: "500+ Courses", value: "500+" }
  ];

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
        position: "relative",
        overflow: "hidden",
        background:
          theme.palette.mode === "light"
            ? `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 50%, ${theme.palette.tertiary.light}20 100%), radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}30 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}30 0%, transparent 50%)`
            : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%), radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}20 0%, transparent 50%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${theme.palette.tertiary.main}10 0%, transparent 70%)`,
          animation: "float 6s ease-in-out infinite"
        },
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      }}
    >
      {/* Floating particles */}
      {particles.map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          sx={{
            position: "absolute",
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            backgroundColor: theme.palette.tertiary.main,
            borderRadius: "50%",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float${i % 3} ${Math.random() * 5 + 5}s ease-in-out infinite`,
            "@keyframes float0": {
              "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
              "50%": { transform: "translateY(-20px) translateX(10px)" }
            },
            "@keyframes float1": {
              "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
              "50%": { transform: "translateY(20px) translateX(-10px)" }
            },
            "@keyframes float2": {
              "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
              "50%": { transform: "translateY(-15px) translateX(-15px)" }
            }
          }}
        />
      ))}

      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 4 }}
      >
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mx: "auto",
              maxWidth: "700px",
              minHeight: "60vh"
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                flexWrap: "wrap"
              }}
            >
              <Book
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                sx={{
                  fontSize: "3rem",
                  color: theme.palette.primary.main,
                  mr: 2
                }}
              />
              <Typography
                variant="h1"
                component={motion.h1}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Unlock Your Potential with Ketra
              </Typography>
              <School
                component={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                sx={{
                  fontSize: "3rem",
                  color: theme.palette.primary.main,
                  ml: 2
                }}
              />
            </Box>

            <Typography
              variant="h5"
              component={motion.p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                maxWidth: "600px",
                fontSize: { xs: "1.1rem", md: "1.25rem" }
              }}
            >
              Empower your learning journey. Master concepts, track progress,
              and excel in your studies with our innovative tools designed for
              students like you.
            </Typography>
          </Box>

          {/* Stats Section */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mb: 4,
              flexWrap: "wrap"
            }}
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                component={motion.div}
                whileHover={{ scale: 1.05, boxShadow: theme.shadows[10] }}
                sx={{
                  minWidth: 120,
                  textAlign: "center",
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[2]
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <stat.icon
                    sx={{
                      fontSize: "2rem",
                      color: theme.palette.primary.main,
                      mb: 1
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {stat.label.split(" ")[1]}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 2
            }}
          >
            <Link href="/subjects">
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayArrow />}
                component={motion.button}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 20px ${theme.palette.primary.main}50`
                }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  padding: theme.spacing(1.5, 4),
                  fontSize: "1.1rem",
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: 600
                }}
              >
                Get Started
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Explore />}
              component={motion.button}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${theme.palette.primary.main}30`
              }}
              whileTap={{ scale: 0.95 }}
              sx={{
                padding: theme.spacing(1, 3),
                fontSize: "1rem",
                borderRadius: theme.shape.borderRadius,
                fontWeight: 600
              }}
              onClick={() => {
                document.getElementById('features').scrollIntoView({
                  behavior:"smooth",
                  block:"start",
                })
              }}
            >
              Explore Features
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider/>
    </Box>
  );
}
