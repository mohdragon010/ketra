"use client"
import { Box, Container, Typography, Card, Grid, LinearProgress } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSubjects } from '../contexts/subjectContexts';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function Dashboard() {
  const { subjects } = useSubjects();
  const totalSubjects = subjects.length;
  const totalTasks = subjects.reduce((acc, subject) => acc + subject.tasks.length, 0);
  const doneTasks = subjects.flatMap(subject => subject.tasks).filter(task => task.isDone).length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
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
        {/* overview */}
        <Card
        component={motion.div}
        initial={{ opacity:0, y:-20}}
        whileInView={{ opacity:1, y:0}}
        transition={{ duration:0.5, delay:0.2}}
        viewport={{ once:true }}
        sx={{
          mt: 3,
          p: 2,
          minHeight: "300px",
          boxShadow:"0 4px 30px rgba(0,0,0,0.1)",
          minWidth:"300px",
          width:{ xs: "100%", md: "70%"},
          display:"flex",
          flexDirection: 'column',
          justifyContent:"center",
          alignItems:"center",
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter:"blur(10px)"
        }}
        >
          <Grid container spacing={2} sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={4}>
              <LibraryBooksIcon sx={{ fontSize: 40, color: '#667EEA', mb: 1 }} />
              <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
                {totalSubjects}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Subjects
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ListAltIcon sx={{ fontSize: 40, color: '#764BA2', mb: 1 }} />
              <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
                {totalTasks}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Tasks
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CheckCircleOutlineIcon sx={{ fontSize: 40, color: '#38A169', mb: 1 }} />
              <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
                {doneTasks}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tasks Done
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ width: '90%', mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress}
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
                    }
                  }} 
                />
              </Box>
              <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
            </Box>
          </Box>
        </Card>
      </Container>
      <Footer />
    </Box>
  );
}