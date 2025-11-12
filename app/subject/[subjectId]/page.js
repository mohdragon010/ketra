"use client";

import { useSubjects } from "@/app/contexts/subjectContexts";
import { Box, Container, Typography, useTheme, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';

export default function SubjectDetails() {
const theme = useTheme();
const { subjects } = useSubjects();
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

    <ul style={{ listStyle: 'none', padding: 0 }}>
        {subject.tasks.map((task, index) => (
        <li key={index}><Typography>{task.isDone ? '✅' : '🔲'} {task.title}</Typography></li>
        ))}
    </ul>
    </Container>
);
}
