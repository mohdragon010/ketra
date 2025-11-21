"use client";
import {
Box,
Container,
Typography,
useTheme,
TextField,
Grid,
Card,
CardContent,
Button,
LinearProgress,
IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSubjects } from "../contexts/subjectContexts.js";
import Link from "next/link.js";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function SubjectPage() {
const theme = useTheme();
const { subjects } = useSubjects();
const [searchQuery, setSearchQuery] = useState("");
const [filteredSubjects, setFilteredSubjects] = useState([]);
useEffect(() => {

    const filtered = subjects.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubjects(filtered);
}, [searchQuery, subjects]);

return (
        <Container maxWidth={false} sx={{ 
                py: 6,
                background: `${theme.palette.mode === "dark" ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)` : "linear-gradient(135deg, #f8f9ff 0%, #ede7f6 100%)"}`,
                minHeight:"100vh"
            }} >
        {/* page title */}
        <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            mb={4}
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            sx={{
                background: `linear-gradient(120deg, ${theme.palette.primary.main}, #BA68C8, #42A5F5)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            Subjects Overview
        </Typography>

        {/* search input */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <TextField
            variant="outlined"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "100%", maxWidth: 400 }}
            />
        </Box>

        {/* subjects grid */}
            <Grid container spacing={3} alignItems="stretch" sx={{display:"flex",justifyContent:"center"}}>
            {filteredSubjects.length > 0 ? (filteredSubjects.map((subject, index) => {
                const completedTasks = subject.tasks.filter(task => task.isDone).length;
                const totalTasks = subject.tasks.length;
                const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                return (
                <Grid item xs={12} sm={6} md={4} key={subject.id} sx={{ display: 'flex' }}>
                    <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0,transition:{delay:index * 0.1}}}
                    whileHover={{ y: -8 }}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 2,
                        backgroundColor: theme.palette.background.paper,
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 2.5,
                        background: `linear-gradient(135deg, ${subject.color}08 0%, transparent 100%)`,
                        border: `1px solid ${subject.color}20`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, ${subject.color}, transparent)`,
                        },
                        ':hover': {
                        boxShadow: `0 20px 60px ${subject.color}25`,
                        borderColor: `${subject.color}40`,
                        transform: 'translateY(-8px)',
                        }
                    }}
                    >
                    <CardContent sx={{ pb: 0 }}>
                        {/* Header with icon and progress badge */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box
                            sx={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '10px',
                            background: `${subject.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px'
                            }}
                        >   
                            {subject.icon}
                        </Box>
                        <Box
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12px',
                            color: subject.color,
                            background: subject.color + '10',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '20px',
                            fontWeight: 600
                            }}
                        >
                            📈 {progress}%
                        </Box>
                        </Box>

                        {/* Title */}
                        <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${subject.color} )`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1.1rem',
                        }}
                        >
                        {subject.title}
                        </Typography>

                        {/* Task stats */}
                        <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            mb: 2.5,
                            fontSize: '0.85rem',
                        }}
                        >
                        {completedTasks} of {totalTasks} tasks completed
                        </Typography>
                    </CardContent>

                    {/* Progress section */}
                    <CardContent sx={{ pt: 1 }}>
                        <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                            <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                color: 'text.secondary'
                            }}
                            >
                            Progress
                            </Typography>
                            <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                color: progress >= 75 ? '#10b981' : progress >= 50 ? '#f59e0b' : '#ef4444',
                                fontSize: '0.8rem',
                            }}
                            >
                            {progress}%
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                            height: '6px',
                            borderRadius: '3px',
                            backgroundColor: subject.color + '15',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: '3px',
                                background: `linear-gradient(90deg, ${subject.color}, ${subject.color}dd)`,
                                boxShadow: `0 0 8px ${subject.color}40`,
                            },
                            }}
                        />
                        </Box>

                        {/* Pending tasks count */}
                        <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 12px',
                            background: subject.color + '08',
                            borderRadius: '8px',
                            mb: 2,
                        }}
                        >
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                            {totalTasks - completedTasks} Pending
                        </Typography>
                        </Box>
                    </CardContent>

                    {/* Action Button */}
                    <CardContent sx={{ pt: 0, mt: 'auto' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <IconButton component={Link} href={`/subject/${subject.id}`} sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: 'action.hover'
                                }
                            }}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'warning.main',
                                    backgroundColor: 'action.hover'
                                }
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'error.main',
                                    backgroundColor: 'action.hover'
                                }
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                    </Card>
                </Grid>
                );
            })) : (
                <Box sx={{ mt: 8, textAlign: 'center', width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            No Subjects Found
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {searchQuery ? `No subjects match your search for "${searchQuery}".` : "There are no subjects to display yet."}
                        </Typography>
                    </motion.div>
                </Box>
            )}
            </Grid>
        </Container>
);
}
