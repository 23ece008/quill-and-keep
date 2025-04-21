
import { Note } from "../types";

// Local Storage Keys
const NOTES_STORAGE_KEY = "quill_and_keep_notes";

// Get all notes from local storage
export const getNotes = (): Note[] => {
  const notesJson = localStorage.getItem(NOTES_STORAGE_KEY);
  return notesJson ? JSON.parse(notesJson) : [];
};

// Save all notes to local storage
export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

// Add a new note
export const addNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note => {
  const notes = getNotes();
  const newNote: Note = {
    id: crypto.randomUUID(),
    title: note.title,
    content: note.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  saveNotes([newNote, ...notes]);
  return newNote;
};

// Update an existing note
export const updateNote = (id: string, updatedNote: Partial<Omit<Note, "id" | "createdAt">>): Note | null => {
  const notes = getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  
  if (noteIndex === -1) return null;
  
  const updatedNoteData: Note = {
    ...notes[noteIndex],
    ...updatedNote,
    updatedAt: new Date().toISOString(),
  };
  
  notes[noteIndex] = updatedNoteData;
  saveNotes(notes);
  
  return updatedNoteData;
};

// Delete a note
export const deleteNote = (id: string): boolean => {
  const notes = getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  
  if (filteredNotes.length === notes.length) return false;
  
  saveNotes(filteredNotes);
  return true;
};
