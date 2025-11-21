"use client"

import { createContext, useContext, useState, useEffect} from 'react';
import moment from 'moment';
import { v4 } from 'uuid';

const SubjectsContext = createContext();
export function SubjectsProvider({ children }){
    const [subjects, setSubjects] = useState(() => {
        try {
            const savedSubjects = localStorage.getItem("subjects");
            if (savedSubjects) {
                const parsedSubjects = JSON.parse(savedSubjects);
                if (Array.isArray(parsedSubjects) && parsedSubjects.length > 0) {
                    return parsedSubjects;
                }
            }
        } catch (error) {
            console.error("Failed to parse subjects from localStorage", error);
        }
        return [
            // {
            //     id:v4(),
            //     title: "Math",
            //     color: "#4A90E2",
            //     icon: "📘",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Do homework", description: "Complete exercises from pages 1 to 20", createdAt: `${moment().format('L')}`, priority: "medium", category: ["homework","School"] },
            //         { id:v4(), isDone: true, title: "Study polynomial functions", description: "Study polynomial function and solve practice exam", createdAt: `${moment().format('L')}`, priority: "high", category: ["study","Math"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "English",
            //     color: "#E24A90",
            //     icon: "📚",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Read Chapter 5", description: "Read and summarize Chapter 5 of To Kill a Mockingbird", createdAt: `${moment().format('L')}`, priority: "high", category: ["reading","Literature"] },
            //         { id:v4(), isDone: false, title: "Essay Writing", description: "Write a 500-word essay on modern poetry", createdAt: `${moment().format('L')}`, priority: "high", category: ["writing","Essay"] },
            //         { id:v4(), isDone: true, title: "Vocabulary Quiz", description: "Study 20 new vocabulary words for the quiz", createdAt: `${moment().format('L')}`, priority: "medium", category: ["vocabulary","Quiz"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "Science",
            //     color: "#4AE290",
            //     icon: "🔬",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Lab Report", description: "Complete the photosynthesis lab report with diagrams", createdAt: `${moment().format('L')}`, priority: "high", category: ["lab","Biology"] },
            //         { id:v4(), isDone: true, title: "Study Periodic Table", description: "Memorize first 30 elements of the periodic table", createdAt: `${moment().format('L')}`, priority: "medium", category: ["chemistry","study"] },
            //         { id:v4(), isDone: false, title: "Physics Assignment", description: "Solve 15 problems on Newton's Laws of Motion", createdAt: `${moment().format('L')}`, priority: "high", category: ["physics","problems"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "History",
            //     color: "#E2904A",
            //     icon: "📜",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Research Project", description: "Research the Industrial Revolution and prepare presentation", createdAt: `${moment().format('L')}`, priority: "high", category: ["research","project"] },
            //         { id:v4(), isDone: false, title: "Timeline Creation", description: "Create a detailed timeline of World War II events", createdAt: `${moment().format('L')}`, priority: "medium", category: ["timeline","WW2"] },
            //         { id:v4(), isDone: true, title: "Read Chapter 3", description: "Read textbook Chapter 3 on Ancient Rome", createdAt: `${moment().format('L')}`, priority: "low", category: ["reading","Ancient"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "PE",
            //     color: "#90E24A",
            //     icon: "⚽",
            //     tasks: [
            //         { id:v4(), isDone: true, title: "Running Practice", description: "Complete 5km running session and track time", createdAt: `${moment().format('L')}`, priority: "medium", category: ["exercise","cardio"] },
            //         { id:v4(), isDone: false, title: "Basketball Drill", description: "Practice 50 free throws and shooting drills", createdAt: `${moment().format('L')}`, priority: "medium", category: ["sports","basketball"] },
            //         { id:v4(), isDone: false, title: "Flexibility Training", description: "Complete 30-minute yoga and stretching session", createdAt: `${moment().format('L')}`, priority: "low", category: ["exercise","flexibility"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "Computer Science",
            //     color: "#4AE2E2",
            //     icon: "💻",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Code Assignment", description: "Build a calculator app in Python with GUI", createdAt: `${moment().format('L')}`, priority: "high", category: ["coding","Python"] },
            //         { id:v4(), isDone: false, title: "Data Structures", description: "Study and implement linked lists and trees", createdAt: `${moment().format('L')}`, priority: "high", category: ["algorithms","study"] },
            //         { id:v4(), isDone: true, title: "Web Design", description: "Create a responsive website using HTML/CSS", createdAt: `${moment().format('L')}`, priority: "medium", category: ["web","frontend"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "Economics",
            //     color: "#E2E24A",
            //     icon: "💰",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Supply & Demand", description: "Complete assignment on supply and demand curves", createdAt: `${moment().format('L')}`, priority: "high", category: ["economics","graphs"] },
            //         { id:v4(), isDone: false, title: "Case Study", description: "Analyze a real-world business case study", createdAt: `${moment().format('L')}`, priority: "high", category: ["analysis","business"] },
            //         { id:v4(), isDone: true, title: "Quiz Preparation", description: "Study macroeconomics chapter 5 for upcoming quiz", createdAt: `${moment().format('L')}`, priority: "medium", category: ["study","macro"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "Geography",
            //     color: "#4AE2A2",
            //     icon: "🌍",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Map Labeling", description: "Label all countries and capitals of Europe", createdAt: `${moment().format('L')}`, priority: "medium", category: ["mapping","Europe"] },
            //         { id:v4(), isDone: false, title: "Climate Zones", description: "Research and document different climate zones around the world", createdAt: `${moment().format('L')}`, priority: "high", category: ["research","climate"] },
            //         { id:v4(), isDone: true, title: "Mountain Ranges", description: "Identify major mountain ranges and their heights", createdAt: `${moment().format('L')}`, priority: "low", category: ["study","mountains"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "Music",
            //     color: "#E2A24A",
            //     icon: "🎵",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Piano Practice", description: "Practice Chopin Nocturne for 1 hour", createdAt: `${moment().format('L')}`, priority: "high", category: ["practice","piano"] },
            //         { id:v4(), isDone: true, title: "Theory Test", description: "Study music theory and prepare for exam on scales", createdAt: `${moment().format('L')}`, priority: "medium", category: ["theory","exam"] },
            //         { id:v4(), isDone: false, title: "Sight Reading", description: "Complete 10 sight reading exercises from sheet music", createdAt: `${moment().format('L')}`, priority: "medium", category: ["reading","skills"] }
            //     ]
            // },
            // {
            //     id:v4(),
            //     title: "French",
            //     color: "#A24AE2",
            //     icon: "🇫🇷",
            //     tasks: [
            //         { id:v4(), isDone: false, title: "Verb Conjugation", description: "Practice conjugating 30 verbs in present tense", createdAt: `${moment().format('L')}`, priority: "high", category: ["grammar","verbs"] },
            //         { id:v4(), isDone: true, title: "Listening Exercise", description: "Listen to French podcast and answer comprehension questions", createdAt: `${moment().format('L')}`, priority: "medium", category: ["listening","practice"] },
            //         { id:v4(), isDone: false, title: "Essay Writing", description: "Write a 300-word essay about your family in French", createdAt: `${moment().format('L')}`, priority: "high", category: ["writing","essay"] }
            //     ]
            // }
        ];
    });

    // 3. Save to localStorage whenever subjects change
    useEffect(() => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);

    return(
        <SubjectsContext.Provider value={{subjects, setSubjects}}>
            {children}
        </SubjectsContext.Provider>
    )
}
export function useSubjects(){
    const context = useContext(SubjectsContext);
    return context;
}