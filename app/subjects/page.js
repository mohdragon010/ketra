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
Modal,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSubjects } from "../contexts/subjectContexts.js";
import Link from "next/link.js";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import CalculateIcon from '@mui/icons-material/Calculate';
import PublicIcon from '@mui/icons-material/Public';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import { SUBJECT_COLORS } from "../theme.js";
import { v4 } from "uuid";
import ScrollToTop from "../components/ScrollToTop";
export default function SubjectPage() {
const theme = useTheme();
const { subjects, setSubjects } = useSubjects();
const [searchQuery, setSearchQuery] = useState("");
const [filteredSubjects, setFilteredSubjects] = useState([]);

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


const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [subjectToDelete, setSubjectToDelete] = useState(null);
const closeDeleteDialog = () => {setDeleteDialogOpen(false); setSubjectToDelete(null);}
const openDeleteDialog = (subjectId) => {setDeleteDialogOpen(true); setSubjectToDelete(subjectId)}

const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
const [subjectToUpdate, setSubjectToUpdate] = useState(null);
const closeUpdateDialog = () => {setUpdateDialogOpen(false); setSubjectToUpdate(null);}
const openUpdateDialog = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
        setSubjectToUpdate(subjectId);
        setUpdateSubjectFields({
            title: subject.title,
            color: subject.color,
            icon: subject.icon,
        });
        setUpdateDialogOpen(true);
    }
}
const [updateSubjectFields, setUpdateSubjectFields] = useState({
    title: "",
    color: "",
    icon: "",
});



const [createDialogOpen, setCreateDialogOpen] = useState(false);
const closeCreateDialog = () => {setCreateDialogOpen(false);}
const [createSubjectFields, setCreateSubjectFields] = useState({
    title: "",
    color: SUBJECT_COLORS[0],
    icon: availableIcons[0].name,
});


const handleCreateSubject = () => {
    const newSubject = {
        id: v4(),
        title: createSubjectFields.title,
        color: createSubjectFields.color,
        icon: createSubjectFields.icon,
        tasks: [],
    }
    setSubjects([...subjects, newSubject]);
    closeCreateDialog();
};
const handleUpdateSubject = (subjectId) => {
    setSubjects(subjects.map(subject => 
        subject.id === subjectId 
        ? { ...subject, ...updateSubjectFields } 
        : subject
    ));
    setUpdateSubjectFields({ title: "", color: "", icon: "" });
    closeUpdateDialog();
};

const handleDeleteSubject = (subjectId) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
    closeDeleteDialog();
};

useEffect(() => {

    const filtered = subjects.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubjects(filtered);
}, [searchQuery, subjects]);

return (
    <>
    {/* Create modal */}
        <Modal
        open={createDialogOpen}
        onClose={closeCreateDialog}
        aria-labelledby="create-title"
        aria-describedby="create-description"
        >
        <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            }}
        >
            <Typography id="create-title" variant="h6" fontWeight={600}>
            Create Subject
            </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Title"
                        name="title"
                        value={createSubjectFields.title}
                        onChange={(e) => setCreateSubjectFields({ ...createSubjectFields, title: e.target.value })}
                    />
                    <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2, mb: 1 }}>
                        Color
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {SUBJECT_COLORS.map((color) => (
                            <Box
                                key={color}
                                onClick={() => setCreateSubjectFields({ ...createSubjectFields, color: color })}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    cursor: 'pointer',
                                    border: createSubjectFields.color === color ? `3px solid ${theme.palette.primary.main}` : `3px solid transparent`,
                                    transition: 'border 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2, mb: 1 }}>
                        Icon
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {availableIcons.map((icon) => (
                            <IconButton
                                key={icon.name}
                                onClick={() => setCreateSubjectFields({ ...createSubjectFields, icon: icon.name })}
                                sx={{
                                    fontSize: '24px',
                                    border: createSubjectFields.icon === icon.name ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.divider}`,
                                    color: createSubjectFields.icon === icon.name ? theme.palette.primary.main : theme.palette.text.secondary,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: theme.palette.primary.main,
                                        borderColor: theme.palette.primary.main,
                                    }
                                }}
                            >
                                {icon.component}
                            </IconButton>
                        ))}
                    </Box>

                </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {handleCreateSubject()}}
            >
                Create
            </Button>

            <Button variant="outlined" onClick={closeCreateDialog}>
                Cancel
            </Button>
            </Box>
        </Box>
    </Modal>
    {/* edit modal */}
    <Modal
        open={updateDialogOpen}
        onClose={closeUpdateDialog}
        aria-labelledby="update-title"
        aria-describedby="update-description"
        >
        <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            }}
        >
            <Typography id="update-title" variant="h6" fontWeight={600}>
            Edit Subject
            </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Title"
                        name="title"
                        value={updateSubjectFields.title}
                        onChange={(e) => setUpdateSubjectFields({ ...updateSubjectFields, title: e.target.value })}
                    />
                    <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2, mb: 1 }}>
                        Color
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {SUBJECT_COLORS.map((color) => (
                            <Box
                                key={color}
                                onClick={() => setUpdateSubjectFields({ ...updateSubjectFields, color })}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    cursor: 'pointer',
                                    border: updateSubjectFields.color === color ? `3px solid ${theme.palette.primary.main}` : `3px solid transparent`,
                                    transition: 'border 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2, mb: 1 }}>
                        Icon
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {availableIcons.map((icon) => (
                            <IconButton
                                key={icon.name}
                                onClick={() => setUpdateSubjectFields({ ...updateSubjectFields, icon: icon.name })}
                                sx={{
                                    fontSize: '24px',
                                    border: updateSubjectFields.icon === icon.name ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.divider}`,
                                    color: updateSubjectFields.icon === icon.name ? theme.palette.primary.main : theme.palette.text.secondary,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: theme.palette.primary.main,
                                        borderColor: theme.palette.primary.main,
                                    }
                                }}
                            >
                                {icon.component}
                            </IconButton>
                        ))}
                    </Box>

                </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {handleUpdateSubject(subjectToUpdate)}}
            >
                Edit
            </Button>

            <Button variant="outlined" onClick={closeUpdateDialog}>
                Cancel
            </Button>
            </Box>
        </Box>
    </Modal>
    {/* delete modal */}
    <Modal
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        >
        <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            }}
        >
            <Typography id="delete-title" variant="h6" fontWeight={600}>
            Delete Subject?
            </Typography>

            <Typography id="delete-description" sx={{ mt: 1.5 }} color="text.secondary">
                Are you sure you want to delete this subject? This action cannot be undone.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteSubject(subjectToDelete)}
            >
                Delete
            </Button>

            <Button variant="outlined" onClick={closeDeleteDialog}>
                Cancel
            </Button>
            </Box>
        </Box>
    </Modal>
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
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 550,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderColor: theme.palette.primary.main,
                }
            }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                }}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {setCreateDialogOpen(true)}}
                sx={{
                    flexShrink: 0,
                    height: '56px',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    boxShadow: 'none',
                }}
            >
                Create Subject
            </Button>
            </Box>
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
                            <IconButton component={Link} href={`/subjects/${subject.id}`} sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: 'action.hover'
                                }
                            }}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {openUpdateDialog(subject.id)}}
                                sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'warning.main',
                                    backgroundColor: 'action.hover'
                                }
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {openDeleteDialog(subject.id)}}
                                sx={{
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
        <ScrollToTop />
    </>
);
}