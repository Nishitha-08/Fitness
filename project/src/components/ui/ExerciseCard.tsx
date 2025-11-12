import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface ExerciseCardProps {
  name: string;
  category: string;
  duration: string;
  calories: string;
  onAdd: () => void;
}

export const ExerciseCard = ({ name, category, duration, calories, onAdd }: ExerciseCardProps) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Strength":
        return "bg-gradient-primary text-primary-foreground";
      case "Cardio":
        return "bg-gradient-accent text-accent-foreground";
      case "Flexibility":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg mb-2">{name}</h3>
          <Badge className={getCategoryColor(category)}>{category}</Badge>
        </div>
        <Button size="icon" variant="outline" onClick={onAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>⏱️ {duration}</span>
        <span>🔥 {calories}</span>
      </div>
    </Card>
  );
};
