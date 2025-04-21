
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Note } from "@/types";
import { getNotes, addNote, updateNote, deleteNote } from "@/services/storageService";
import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import NoteDialog from "@/components/NoteDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import EmptyState from "@/components/EmptyState";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = getNotes();
    setNotes(storedNotes);
  }, []);

  // Handle creating a new note
  const handleNewNote = () => {
    setSelectedNote(undefined);
    setIsNoteDialogOpen(true);
  };

  // Handle editing an existing note
  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setSelectedNote(noteToEdit);
      setIsNoteDialogOpen(true);
    }
  };

  // Handle saving a note (create or update)
  const handleSaveNote = (noteData: { title: string; content: string }) => {
    if (selectedNote) {
      // Update existing note
      const updatedNote = updateNote(selectedNote.id, noteData);
      if (updatedNote) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === selectedNote.id ? updatedNote : note
          )
        );
        toast({
          title: "Note Updated",
          description: "Your note has been updated successfully.",
        });
      }
    } else {
      // Create new note
      const newNote = addNote(noteData);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      toast({
        title: "Note Created",
        description: "Your note has been created successfully.",
      });
    }
    setIsNoteDialogOpen(false);
  };

  // Handle initiating note deletion
  const handleDeleteClick = (id: string) => {
    setNoteToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirming note deletion
  const handleConfirmDelete = () => {
    if (noteToDelete) {
      const success = deleteNote(noteToDelete);
      if (success) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== noteToDelete)
        );
        toast({
          title: "Note Deleted",
          description: "Your note has been deleted successfully.",
        });
      }
      setIsDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNewNote={handleNewNote} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {notes.length === 0 ? (
          <EmptyState onNewNote={handleNewNote} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Note Editor Dialog */}
      <NoteDialog
        note={selectedNote}
        isOpen={isNoteDialogOpen}
        onClose={() => setIsNoteDialogOpen(false)}
        onSave={handleSaveNote}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Index;
