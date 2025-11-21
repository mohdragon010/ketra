    "use client";

    import { motion, AnimatePresence } from 'framer-motion';
    import { useSubjects } from '@/app/contexts/subjectContexts';
    import { Box, Container, Typography, useTheme, LinearProgress, Card, Toolbar, IconButton, Modal, Button, Chip, CardContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
    import { useEffect, useState, useMemo } from "react";
    import DoneIcon from '@mui/icons-material/Done';
    import EditIcon from '@mui/icons-material/Edit';
    import DeleteIcon from '@mui/icons-material/Delete';
    import ArrowBackIcon from '@mui/icons-material/ArrowBack';
    import { useRouter, useParams } from 'next/navigation';
    import moment from 'moment';
    import { v4 } from 'uuid';

    export default function SubjectDetails() {
    const theme = useTheme();
    const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [editDialogOpen,setEditDialogOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [createDialogOpen,setCreateDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('all');
    const [editTaskFields, setEditTaskFields] = useState({
        title: '',
        description: '',
        priority: '',
        category: [],
    });
    const [createTaskFields,setCreateTaskFields] = useState({
        title:"",
        description:"",
        priority:"",
        category:[]
    });
    const handleOpenDeleteDialog = (taskId) => {
        setTaskToDelete(taskId);
        setDeleteDialogOpen(true);
    }
    const handleCloseDeleteDialog = () => {setDeleteDialogOpen(false); setTaskToDelete(null);}
    const handleOpenEditDialog = (taskId) => {
        const task = subject.tasks.find(t => t.id === taskId);
        setTaskToEdit(task);
        setEditTaskFields({
            title: task.title,
            description: task.description,
            priority: task.priority,
            category: task.category,
        });
        setEditDialogOpen(true);
    }
    const handleCloseEditDialog = () => {setEditDialogOpen(false); setTaskToEdit(null);}
    const handleOpenCreateDialog = () => {setCreateDialogOpen(true); setCreateTaskFields({
        title:"",
        description:"",
        priority:"",
        category:[]
    })}
    const handleCloseCreateDialog = () => {setCreateDialogOpen(false); setCreateTaskFields({
        title:"",
        description:"",
        priority:"",
        category:[]
    });}
    const { subjects, setSubjects } = useSubjects();
    const router = useRouter();
    const params = useParams();
    const subjectId = params.subjectId;
    const subject = subjects.find(s => s.id === subjectId);

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
    const handleEditTask = () => {
        const newSubjects = subjects.map(sub => {
            if(sub.id !== subject.id) return sub;

            return{
                ...sub,
                tasks: sub.tasks.map(task => {
                if (task.id === taskToEdit?.id) {
                    return { ...task, ...editTaskFields };
                }
                return task;
            })
            }
        })
        setSubjects(newSubjects);
        handleCloseEditDialog();
    }
    const handleCreateTask = () => {
        const newSubjects = subjects.map(sub => {
            if(sub.id !== subject.id) return sub;

            return{
                ...sub,
                tasks:[...sub.tasks,{
                    id:v4(),
                    isDone:false,
                    title:createTaskFields.title,
                    description:createTaskFields.description,
                    createdAt:`${moment().format('L')}`,
                    priority:createTaskFields.priority,
                    category:createTaskFields.category
                }]
            }
        })
        setSubjects(newSubjects)
        handleCloseCreateDialog()
    }

    const doneTasks = subject.tasks.filter(t => t.isDone).length;
    const totalTasks = subject.tasks.length;
    const progress = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

    const filteredTasks = useMemo(() => {
        if (!subject?.tasks) return [];
    
        return subject.tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    task.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    task.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    
            const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
            return matchesSearch && matchesPriority;
        });
    }, [subject.tasks, searchQuery, filterPriority]);
    

    const priorityColors = {
        high: 'error',
        medium: 'warning',
        low: 'info',
    };

    return (
        <Container
        maxWidth="md"
        sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
            background: theme.palette.background.paper,
            boxShadow: '0px 10px 25px -10px rgba(0,0,0,0.1)',
            borderTop: `6px solid ${subject.color}`,
        }}
        >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => router.back()} aria-label="go back">
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h2" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span>{subject.icon}</span>
                {subject.title}
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h5">Tasks ({doneTasks}/{totalTasks})</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={filterPriority}
                        label="Priority"
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                </FormControl>
                <Button variant='contained' onClick={handleOpenCreateDialog}>
                    Add Task
                </Button>
            </Box>
        </Box>
        <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
                height: 8,
                borderRadius: 4,
                mb: 3,
                '& .MuiLinearProgress-bar': {
                    backgroundColor: subject.color || theme.palette.primary.main,
                },
            }} />
            {/* Create Modal */}
                <Modal
                open={createDialogOpen}
                onClose={handleCloseCreateDialog}
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
                    <Typography id="delete-title" variant="h6" fontWeight={600}>
                    Create Task
                    </Typography>
                        <Box component="form" sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Title"
                                name="title"
                                value={createTaskFields.title}
                                onChange={(e) => setCreateTaskFields({ ...createTaskFields, title: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Description"
                                name="description"
                                multiline
                                rows={3}
                                value={createTaskFields.description}
                                onChange={(e) => setCreateTaskFields({ ...createTaskFields, description: e.target.value })}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="priority-select-label">Priority</InputLabel>
                                <Select
                                    labelId="priority-select-label"
                                    value={createTaskFields.priority}
                                    label="Priority"
                                    onChange={(e) => setCreateTaskFields({ ...createTaskFields, priority: e.target.value })}
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Categories (comma-separated)"
                                name="categories"
                                value={createTaskFields.category.join(', ')}
                                onChange={(e) => setCreateTaskFields({ ...createTaskFields, category: e.target.value.split(',').map(cat => cat.trim()) })}
                                helperText="Separate categories with a comma"
                            />
                        </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {handleCreateTask()}}
                    >
                        Create
                    </Button>

                    <Button variant="outlined" onClick={handleCloseCreateDialog}>
                        Cancel
                    </Button>
                    </Box>
                </Box>
            </Modal>
            {/* delete modal */}
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
            {/* edit modal */}
            <Modal
                open={editDialogOpen}
                onClose={handleCloseEditDialog}
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
                    {/* Edit choices */}
                    <Typography id="delete-title" variant="h6" fontWeight={600}>
                    Edit Task
                    </Typography>
                    {taskToEdit && (
                        <Box component="form" sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Title"
                                name="title"
                                defaultValue={taskToEdit.title}
                                onChange={(e) => setEditTaskFields({ ...editTaskFields, title: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Description"
                                name="description"
                                multiline
                                rows={3}
                                defaultValue={taskToEdit.description}
                                onChange={(e) => setEditTaskFields({ ...editTaskFields, description: e.target.value })}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="priority-select-label">Priority</InputLabel>
                                <Select
                                    labelId="priority-select-label"
                                    defaultValue={taskToEdit.priority}
                                    label="Priority"
                                    onChange={(e) => setEditTaskFields({ ...editTaskFields, priority: e.target.value })}
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Categories (comma-separated)"
                                name="categories"
                                defaultValue={taskToEdit.category.join(', ')}
                                onChange={(e) => setEditTaskFields({ ...editTaskFields, category: e.target.value.split(',').map(cat => cat.trim()) })}
                                helperText="Separate categories with a comma"
                            />
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {handleEditTask()}}
                    >
                        Edit
                    </Button>

                    <Button variant="outlined" onClick={handleCloseEditDialog}>
                        Cancel
                    </Button>
                    </Box>
                </Box>
            </Modal>
            <AnimatePresence>
                {filteredTasks.length > 0 ? (filteredTasks.map((task) => (
                    <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    >
                        <Card
                        sx={{
                            borderLeft: `5px solid ${theme.palette[priorityColors[task.priority] || 'grey'].main}`,
                            background: theme.palette.background.main,
                            margin: "10px 0",
                            borderRadius: "8px",
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: 'none',
                        }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 2, '&:last-child': { pb: 2 } }}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        textDecoration: task.isDone ? 'line-through' : 'none',
                                        color: task.isDone ? 'text.disabled' : 'text.primary',
                                        fontWeight: 500,
                                    }}
                                >
                                    {task.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5 }}>
                                    {task.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                                    <Chip label={task.priority} color={priorityColors[task.priority] || 'default'} size="small" />
                                    {task.category.map((cat, index) => (
                                        <Chip key={index} label={cat} size="small" variant="outlined" />
                                    ))}
                                </Box>
                                <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1.5 }}>
                                    Created: {task.createdAt}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 1, alignSelf: 'flex-start' }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, gap: 1 }}>
                                    <IconButton
                                        onClick={() => {handleDoneTask(task.id)}}
                                        sx={{
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'success.main',
                                                backgroundColor: 'action.hover'
                                            }
                                        }}
                                    ><DoneIcon/></IconButton>
                                    <IconButton
                                        onClick={() => {handleOpenEditDialog(task.id);}}
                                        sx={{
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: 'action.hover'
                                            }
                                        }}
                                    ><EditIcon/></IconButton>
                                    <IconButton
                                        onClick={() => handleOpenDeleteDialog(task.id)}
                                        sx={{
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'error.main',
                                                backgroundColor: 'action.hover'
                                            }
                                        }}
                                    ><DeleteIcon/></IconButton>
                                </Box>
                            </Box>
                        </Card>
                    </motion.div>
                ))) : (
                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">No tasks found.</Typography>
                        <Typography variant="body1" color="text.secondary">{(searchQuery || filterPriority !== 'all') ? "Try adjusting your search or filters." : "Add a new task to get started!"}</Typography>
                    </Box>
                )}
            </AnimatePresence>
        </Container>
    );
    }
