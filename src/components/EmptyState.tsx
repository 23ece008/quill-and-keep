
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onNewNote: () => void;
}

const EmptyState = ({ onNewNote }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4 animate-fade-in">
      <h2 className="text-xl font-serif mb-2">No notes yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Create your first note to get started with Quill & Keep!
      </p>
      <Button onClick={onNewNote} className="flex items-center gap-1">
        <Plus className="h-4 w-4" />
        <span>Create Your First Note</span>
      </Button>
    </div>
  );
};

export default EmptyState;
