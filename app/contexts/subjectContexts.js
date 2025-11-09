"use client"

import { createContext, useContext, useState, useEffect} from 'react';
import moment from 'moment';

const SubjectsContext = createContext();
export function SubjectsProvider({ children }){
    useEffect(() => {
        localStorage.setItem("subjects",JSON.stringify(subjects))
    },[]);
    useEffect(() => {
        setSubjects(JSON.parse(localStorage.getItem("subject")))
    })
    const [subjects, setSubjects] = useState([
        {
        title: "Math",
        color: "#4A90E2",
        icon: "📘",
        tasks: [
            {
            isDone: false,
            title: "Do homework",
            description: "Complete exercises from pages 1 to 20",
            createdAt: `${moment().subtract(10, 'days').calendar()}`,
            priority: "medium",
            category: ["homework","School"]
            },
            {
            isDone: true,
            title: "Study polynomial functions",
            description: "Study polynomial function and solve practice exam",
            createdAt: `${moment().subtract(10, 'days').calendar()}`,
            priority: "high",
            category: ["study","Math"]
            }
        ]
        }
    ])
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