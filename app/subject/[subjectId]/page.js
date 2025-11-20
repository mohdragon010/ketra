    "use client";

    import { motion, AnimatePresence } from "framer-motion";
    import { useSubjects } from "@/app/contexts/subjectContexts";
    import { Box, Container, Typography, useTheme, LinearProgress, Card, Toolbar, IconButton, Modal, Button } from "@mui/material";
    import { useEffect, useState } from "react";
    import DoneIcon from '@mui/icons-material/Done';
    import EditIcon from '@mui/icons-material/Edit';
    import DeleteIcon from '@mui/icons-material/Delete';
    import { useRouter, useParams } from 'next/navigation';

    export default function SubjectDetails() {
    const theme = useTheme();
    const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const handleOpenDeleteDialog = (taskId) => {
        setTaskToDelete(taskId);
        setDeleteDialogOpen(true);
    }
    const handleCloseDeleteDialog = () => {setDeleteDialogOpen(false); setTaskToDelete(null);}
    const { subjects, setSubjects } = useSubjects();
    const router = useRouter();
    const params = useParams();
    const subjectId = params.subjectId;
    const subject = subjects[subjectId];

    useEffect(() => {
        if (subjects.length > 0 && !subject) {
        router.push("/not-found");
        }
    }, [subject, subjects, router]);

    if (!subject) {
        return null;
    }
    const handleDoneTask = (taskId) => {
        const newSubjects = subjects.map((sub) => {
            if(sub.id !== subject.id) return sub;


            return {
                ...sub,
                tasks: sub.tasks.map((task) => task.id === taskId ? {...task,isDone: !task.isDone} : task)
            }
        })
        setSubjects(newSubjects);
    };
    const handleDeleteTask = (taskId) => {
        const newSubjects = subjects.map(sub => {
            if(sub.id !== subject.id) return sub;

            return{
                ...sub,
                tasks: sub.tasks.filter(task => task.id !== taskId)
            }
        })
        setSubjects(newSubjects);
        handleCloseDeleteDialog();
    }

    const doneTasks = subject.tasks.filter(t => t.isDone).length;
    const totalTasks = subject.tasks.length;
    const progress = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

    return (
        <Container
        maxWidth="md"
        sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
        }}
        >
        <Typography variant="h2" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <span>{subject.icon}</span>
            {subject.title}
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Tasks ({doneTasks}/{totalTasks})</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, mb: 3 }} />
            <Modal
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
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
                    Delete Task
                    </Typography>

                    <Typography id="delete-description" sx={{ mt: 1.5 }} color="text.secondary">
                    Are you sure you want to delete this task? This action cannot be undone.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteTask(taskToDelete)}
                    >
                        Delete
                    </Button>

                    <Button variant="outlined" onClick={handleCloseDeleteDialog}>
                        Cancel
                    </Button>
                    </Box>
                </Box>
            </Modal>
            <AnimatePresence>
                {subject.tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    >
                        <Card
                        sx={{
                            background:theme.palette.background.main,
                            height:"50px",
                            margin:"7px",
                            padding:"7px",
                            borderRadius:"5px",
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center"
                            }}
                            >
                            <Typography
                                sx={{
                                    textDecoration: task.isDone ? "line-through" : "none",
                                    color: task.isDone ? "gray" : theme.palette.text.primary,
                                }}
                            >{task.title}</Typography>
                            <Toolbar>
                                <IconButton
                                    onClick={() => {handleDoneTask(task.id)}}
                                    style={{
                                        background:theme.palette.background.paper,
                                        border:"2px solid #32CD32",
                                        height:"35px",
                                        width:"35px",
                                        margin:"7px"
                                    }}
                                ><DoneIcon/></IconButton>
                                <IconButton
                                    style={{
                                        background:theme.palette.background.paper,
                                        border:"2px solid #1E90FF",
                                        height:"35px",
                                        width:"35px",
                                        margin:"7px"
                                    }}
                                ><EditIcon/></IconButton>
                                <IconButton
                                    onClick={() => handleOpenDeleteDialog(task.id)}
                                    style={{
                                        background:theme.palette.background.paper,
                                        border:"2px solid #DC143C",
                                        height:"35px",
                                        width:"35px",
                                        margin:"7px"
                                    }}
                                ><DeleteIcon/></IconButton>
                            </Toolbar>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </Container>
    );
    }
