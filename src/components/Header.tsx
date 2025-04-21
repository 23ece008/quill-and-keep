
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  onNewNote: () => void;
}

const Header = ({ onNewNote }: HeaderProps) => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-serif font-bold tracking-tight">Quill & Keep</h1>
          <p className="text-sm text-muted-foreground hidden sm:inline-block">Your personal note-taking app</p>
        </div>
        <Button onClick={onNewNote} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>New Note</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
