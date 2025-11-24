"use client"
import { useMemo } from 'react';
import { Box, Container, Typography, Card, Grid, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Tooltip, Button, Chip, Avatar } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useSubjects } from '../contexts/subjectContexts';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import SubjectCardMini from '../components/SubjectCardMini';
import ScrollToTop from '../components/ScrollToTop';
import Link from 'next/link';

const priorityOrder = { high: 3, medium: 2, low: 1 };
const priorityStyles = {
  high: { color: 'error', label: 'High priority' },
  medium: { color: 'warning', label: 'Medium priority' },
  low: { color: 'success', label: 'Low priority' },
};

export default function Dashboard() {
  const { subjects } = useSubjects();

  const {
    totalSubjects,
    totalTasks,
    doneTasks,
    progress,
    unDoneTasks,
    recentlyCompleted,
    priorityStats,
    completionRate,
    tasksCompletedToday
  } = useMemo(() => {
    const allTasks = subjects.flatMap(subject => subject.tasks.map(task => ({ ...task, subjectTitle: subject.title })));
    const done = allTasks.filter(task => task.isDone);
    const unDone = allTasks.filter(task => !task.isDone);

    unDone.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const recentDone = done
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const highPriority = unDone.filter(t => t.priority === 'high').length;
    const mediumPriority = unDone.filter(t => t.priority === 'medium').length;
    const lowPriority = unDone.filter(t => t.priority === 'low').length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const completedToday = done.filter(task => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    }).length;

    const total = allTasks.length;
    const progressPercentage = total > 0 ? Math.round((done.length / total) * 100) : 0;
    const rate = total > 0 ? ((done.length / total) * 100).toFixed(1) : 0;

    return {
      totalSubjects: subjects.length,
      totalTasks: total,
      doneTasks: done.length,
      progress: progressPercentage,
      unDoneTasks: unDone,
      recentlyCompleted: recentDone,
      priorityStats: { high: highPriority, medium: mediumPriority, low: lowPriority },
      completionRate: rate,
      tasksCompletedToday: completedToday
    };
  }, [subjects]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 8, display:"flex", alignItems:"center", flexDirection:"column", minHeight: "80vh"}}>
        <Typography 
          variant='h2'
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:"transparent",
            cursor:"pointer",
            fontSize: { xs: '2.5rem', md: '3.75rem' }
          }}
        >
          Dashboard
        </Typography>
        
        <Typography
          variant='h6'
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.2 },
            backgroundPosition: {
              duration: 5,
              ease: 'linear',
              repeat: Infinity,
            }
          }}
          sx={{
            background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%, #667EEA 200%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 500,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          See how you're progressing
        </Typography>

        <Card
        component={motion.div}
        initial={{ opacity:0, y:-20}}
        whileInView={{ opacity:1, y:0}}
        transition={{ duration:0.5, delay:0.2}}
        viewport={{ once:true }}
        sx={{
          mt: 3,
          p: 3,
          minHeight: "300px",
          boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
          minWidth:"300px",
          width:{ xs: "100%", md: "85%"},
          display:"flex",
          flexDirection: 'column',
          justifyContent:"center",
          alignItems:"center",
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
          }
        }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, alignSelf: 'flex-start' }}>
            <TrendingUpIcon /> Overview Statistics
          </Typography>

          <Grid container spacing={2} sx={{ textAlign: 'center', mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667EEA15 0%, #667EEA05 100%)',
                  border: '1px solid #667EEA20',
                  height: '100%',
                  cursor: 'default'
                }}
              >
                <LibraryBooksIcon sx={{ fontSize: 36, color: '#667EEA', mb: 1 }} />
                <Typography variant='h4' component="p" sx={{ fontWeight: 700, color: '#667EEA' }}>
                  {totalSubjects}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Subjects
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #764BA215 0%, #764BA205 100%)',
                  border: '1px solid #764BA220',
                  height: '100%',
                  cursor: 'default'
                }}
              >
                <ListAltIcon sx={{ fontSize: 36, color: '#764BA2', mb: 1 }} />
                <Typography variant="h4" component="p" sx={{ fontWeight: 700, color: '#764BA2' }}>
                  {totalTasks}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Tasks
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #10b98115 0%, #10b98105 100%)',
                  border: '1px solid #10b98120',
                  height: '100%',
                  cursor: 'default'
                }}
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 36, color: '#10b981', mb: 1 }} />
                <Typography variant="h4" component="p" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {doneTasks}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #f59e0b15 0%, #f59e0b05 100%)',
                  border: '1px solid #f59e0b20',
                  height: '100%',
                  cursor: 'default'
                }}
              >
                <PendingActionsIcon sx={{ fontSize: 36, color: '#f59e0b', mb: 1 }} />
                <Typography variant="h4" component="p" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  {unDoneTasks.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Pending
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ width: '100%', mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Box 
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667EEA10 0%, #764BA210 100%)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Avatar sx={{ bgcolor: '#667EEA', width: 40, height: 40 }}>
                  <CalendarTodayIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {tasksCompletedToday}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tasks Today
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box 
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #10b98110 0%, #05966910 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Avatar sx={{ bgcolor: '#10b981', width: 40, height: 40 }}>
                  <EmojiEventsIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {completionRate}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Success Rate
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box 
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                  Priority Tasks
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={`High: ${priorityStats.high}`}
                    size="small"
                    sx={{
                      bgcolor: '#ef444415',
                      color: '#ef4444',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                  <Chip
                    label={`Med: ${priorityStats.medium}`}
                    size="small"
                    sx={{
                      bgcolor: '#f59e0b15',
                      color: '#f59e0b',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                  <Chip
                    label={`Low: ${priorityStats.low}`}
                    size="small"
                    sx={{
                      bgcolor: '#10b98115',
                      color: '#10b981',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Overall Progress</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: progress >= 75 ? '#10b981' : progress >= 50 ? '#f59e0b' : '#667EEA' }}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: 'rgba(0,0,0,0.08)',
                '& .MuiLinearProgress-bar': {
                  background: progress >= 75
                    ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                    : progress >= 50
                    ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                    : 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
                  borderRadius: 6,
                }
              }}
            />
          </Box>
        </Card>

        <Card
          component={motion.div}
          initial={{ opacity:0, y:20}}
          whileInView={{ opacity:1, y:0}}
          transition={{ duration:0.5, delay:0.3}}
          viewport={{ once:true }}
          sx={{
            mt: 6,
            p: 3,
            width: { xs: "100%", md: "85%" },
            boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LibraryBooksIcon /> Subjects Overview
            </Typography>
            {subjects.length > 0 && (
              <Button
                component={Link}
                href="/subjects"
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: 2,
                  borderColor: '#667EEA',
                  color: '#667EEA',
                  '&:hover': {
                    borderColor: '#5568D3',
                    bgcolor: 'rgba(102, 126, 234, 0.04)'
                  }
                }}
              >
                Add Subject
              </Button>
            )}
          </Box>
          <Grid container spacing={2}>
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                  <SubjectCardMini subject={subject} key={subject.id} index={index} />
              ))
            ) : (
              <Grid item xs={12} sx={{ textAlign: 'center', my: 6 }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <LibraryBooksIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                    No Subjects Yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                    Start organizing your learning by creating your first subject. Track tasks, take notes, and monitor your progress!
                  </Typography>
                  <Button
                    component={Link}
                    href="/subjects"
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
                      boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #5568D3 0%, #65408B 100%)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                      }
                    }}
                  >
                    Create Your First Subject
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>

        <Grid container spacing={3} sx={{ mt: 3, width: { xs: "100%", md: "85%" } }}>
          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              initial={{ opacity:0, x:-20}}
              whileInView={{ opacity:1, x:0}}
              transition={{ duration:0.5, delay:0.4}}
              viewport={{ once:true }}
              sx={{
                p: 3,
                height: '100%',
                boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
                display:"flex",
                flexDirection:"column",
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PendingActionsIcon sx={{ color: '#f59e0b' }} /> Upcoming Tasks
              </Typography>
              {unDoneTasks.length > 0 ? (
                <List sx={{ width: '100%', flex: 1 }}>
                  {unDoneTasks.slice(0, 5).map((task, index) => (
                    <ListItem
                      key={task.id}
                      component={motion.div}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        px: 2,
                        py: 1.5,
                        background: 'rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'rgba(0,0,0,0.04)',
                          transform: 'translateX(4px)',
                          borderColor: 'rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Tooltip title={priorityStyles[task.priority]?.label || 'No priority'}>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color={priorityStyles[task.priority]?.color || 'disabled'}
                          />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                            <Chip
                              label={task.subjectTitle}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.7rem',
                                bgcolor: 'rgba(102, 126, 234, 0.1)',
                                color: '#667EEA',
                                fontWeight: 600
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', my: 6, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <PendingActionsIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {totalTasks > 0 ? "All Caught Up! 🎉" : "No Tasks Yet"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {totalTasks > 0 ? "You've completed all your tasks. Great work!" : "Add tasks to your subjects to get started."}
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              initial={{ opacity:0, x:20}}
              whileInView={{ opacity:1, x:0}}
              transition={{ duration:0.5, delay:0.5}}
              viewport={{ once:true }}
              sx={{
                p: 3,
                height: '100%',
                boxShadow:"0 8px 32px rgba(0,0,0,0.12)",
                display:"flex",
                flexDirection:"column",
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssignmentTurnedInIcon sx={{ color: '#10b981' }} /> Recently Completed
              </Typography>
              {recentlyCompleted.length > 0 ? (
                <List sx={{ width: '100%', flex: 1 }}>
                  {recentlyCompleted.map((task, index) => (
                    <ListItem
                      key={task.id}
                      component={motion.div}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        px: 2,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #10b98108 0%, #10b98103 100%)',
                        border: '1px solid #10b98120',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #10b98115 0%, #10b98108 100%)',
                          transform: 'translateX(-4px)',
                          borderColor: '#10b98130'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon
                          fontSize="small"
                          sx={{ color: '#10b981' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'text.primary' }}>
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                            <Chip
                              label={task.subjectTitle}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.7rem',
                                bgcolor: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981',
                                fontWeight: 600
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', my: 6, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <AssignmentTurnedInIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                    No Completed Tasks
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Complete some tasks to see them here!
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <ScrollToTop />
    </Box>
  );
}