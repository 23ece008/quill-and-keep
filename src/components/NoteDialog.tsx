
import { useState, useEffect } from "react";
import { Note } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface NoteDialogProps {
  note?: Note;
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { title: string; content: string }) => void;
}

const NoteDialog = ({ note, isOpen, onClose, onSave }: NoteDialogProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const { toast } = useToast();

  // Initialize form when dialog opens or note changes
  useEffect(() => {
    if (isOpen) {
      setTitle(note?.title || "");
      setContent(note?.content || "");
      setIsTitleEmpty(false);
    }
  }, [isOpen, note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate title
    if (!title.trim()) {
      setIsTitleEmpty(true);
      toast({
        title: "Title Required",
        description: "Please provide a title for your note.",
        variant: "destructive",
      });
      return;
    }
    
    onSave({ title, content });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {note ? "Edit Note" : "Create New Note"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="Note Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsTitleEmpty(false);
                }}
                className={isTitleEmpty ? "border-red-500" : ""}
                aria-invalid={isTitleEmpty}
                autoFocus
              />
              {isTitleEmpty && (
                <p className="text-red-500 text-xs">Title is required</p>
              )}
            </div>
            
            <Textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
