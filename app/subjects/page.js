"use client"

import { useSubjects } from "../contexts/subjectContexts"

export default function subjectPage(){
    const {subjects, setSubjects} = useSubjects();
    console.log(subjects)
}