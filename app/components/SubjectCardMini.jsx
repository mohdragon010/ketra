"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import CalculateIcon from '@mui/icons-material/Calculate';
import PublicIcon from '@mui/icons-material/Public';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';

const availableIcons = [
    { name: 'School', component: <SchoolIcon /> },
    { name: 'Book', component: <BookIcon /> },
    { name: 'Science', component: <ScienceIcon /> },
    { name: 'Computer', component: <ComputerIcon /> },
    { name: 'Calculate', component: <CalculateIcon /> },
    { name: 'Public', component: <PublicIcon /> },
    { name: 'MusicNote', component: <MusicNoteIcon /> },
    { name: 'Brush', component: <BrushIcon /> },
];

export default function SubjectCardMini({ subject, index, openUpdateDialog, openDeleteDialog }){

    const theme = useTheme();

    const totalTasks = subject.tasks?.length || 0;
    const completedTasks = subject.tasks?.filter(task => task.completed).length || 0;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <Grid item xs={12} sm={6} md={4} key={subject.id} sx={{ display: 'flex' }}>
            <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
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
                    {availableIcons.find(icon => icon.name === subject.icon)?.component}
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
            </CardContent>

            {/* Action Button */}
            <CardContent sx={{ pt: 0, mt: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton component={Link} href={`/subjects/${subject.id}`} sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'action.hover'
                        }
                    }}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                </Box>
            </CardContent>
            </Card>
        </Grid>
    )
}