"use client"

import { createContext, useContext, useState} from 'react';


const SubjectsContext = createContext();
export function SubjectsProvider({ children }){
    const [subjects, setSubjects] = useState([
        {
            title:"math",
            tasks:[
                {
                    isDone:false,
                    title:"do homework",
                    description:"do homework from pg 1 to 20"
                },
                {
                    isDone:true,
                    title:"study polynomial function",
                    description:"study polynomial function and solve exam on it"
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
    if (context === undefined) {
        throw new Error('useSubjects must be used within a SubjectsProvider');
    }
    return context;
}