
import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Note } from "@/types";

interface NoteCardProps {
  note: Note;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format the date to relative time
  const formattedDate = formatDistanceToNow(new Date(note.updatedAt), { 
    addSuffix: true 
  });
  
  return (
    <Card 
      className="note-card h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif line-clamp-2">{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="prose flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-6 whitespace-pre-line">
          {note.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t text-xs text-muted-foreground">
        <span>Updated {formattedDate}</span>
        <div className={`flex space-x-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(note.id)}
            aria-label="Edit note"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(note.id)}
            aria-label="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
