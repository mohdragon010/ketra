"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load notes from localStorage on client side only
    useEffect(() => {
        try {
            const savedNotes = localStorage.getItem("notes");
            if (savedNotes) {
                const parsedNotes = JSON.parse(savedNotes);
                if (Array.isArray(parsedNotes) && parsedNotes.length > 0) {
                    setNotes(parsedNotes);
                }
            }
        } catch (error) {
            console.error("Failed to parse notes from localStorage", error);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever notes change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }, [notes, isLoaded]);

    const createNote = () => {
        const newNote = {
            id: uuidv4(),
            title: 'Untitled Note',
            content: '<p>Start writing your notes here...</p>',
            createdAt: moment().format('LLL'),
            updatedAt: moment().format('LLL'),
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        return newNote.id;
    };

    const updateNote = (noteId, updates) => {
        setNotes(prevNotes => prevNotes.map(note =>
            note.id === noteId
                ? { ...note, ...updates, updatedAt: moment().format('LLL') }
                : note
        ));
    };

    const deleteNote = (noteId) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    };

    const getNote = (noteId) => {
        return notes.find(note => note.id === noteId);
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, createNote, updateNote, deleteNote, getNote }}>
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}

