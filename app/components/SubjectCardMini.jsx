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
import Button from '@mui/material/Button';
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
    const completedTasks = subject.tasks?.filter(task => task.isDone).length || 0;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <Grid item xs={4} sm={2} md={1} key={subject.id} sx={{ display: 'flex' }}>
            <Card
            component={motion.div}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
            whileHover={{ y: -4 }}
            sx={{
                borderRadius: 1,
                boxShadow: 0,
                backgroundColor: theme.palette.background.paper,
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 1,
                background: 'transparent',
                border: `1px solid ${subject.color}10`,
                position: 'relative',
                overflow: 'hidden',
            }}
            >
            <CardContent sx={{ pb: 0, px: 1, py: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                        width: 28,
                        height: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: subject.color,
                        }}
                    >
                        {availableIcons.find(icon => icon.name === subject.icon)?.component}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: 'text.primary',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        >
                        {subject.title}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.6 }}>
                    <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
                    >
                    {completedTasks} of {totalTasks} tasks completed
                    </Typography>
                </Box>
            </CardContent>

            <CardContent sx={{ pt: 0.5, pb: 0.5, px: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: subject.color + '08',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: '2px',
                        background: `linear-gradient(90deg, ${subject.color}, ${subject.color}cc)`,
                    },
                    }}
                />
                    <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, fontSize: '0.75rem', color: progress >= 75 ? '#10b981' : progress >= 50 ? '#f59e0b' : '#ef4444' }}
                    >
                    {progress}%
                    </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                    <Button
                        component={Link}
                        href={`/subjects/${subject.id}`}
                        size="small"
                        variant="text"
                        sx={{ textTransform: 'none', fontSize: '0.75rem', p: 1, minWidth: 0 }}
                    >
                        View
                    </Button>
                </Box>
            </CardContent>
            </Card>
        </Grid>
    )
}