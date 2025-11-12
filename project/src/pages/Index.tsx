import { useState, useEffect } from "react";
import { Activity, TrendingUp, Target, Flame } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { WorkoutTimer } from "@/components/WorkoutTimer";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface WorkoutLog {
  id: string;
  exercise: string;
  date: string;
  calories: number;
}

const exercises = [
  { name: "Push-ups", category: "Strength", duration: "15 min", calories: "120 cal" },
  { name: "Running", category: "Cardio", duration: "30 min", calories: "300 cal" },
  { name: "Yoga Flow", category: "Flexibility", duration: "20 min", calories: "100 cal" },
  { name: "Squats", category: "Strength", duration: "15 min", calories: "150 cal" },
  { name: "Cycling", category: "Cardio", duration: "45 min", calories: "400 cal" },
  { name: "Stretching", category: "Flexibility", duration: "10 min", calories: "50 cal" },
  { name: "Plank Hold", category: "Strength", duration: "10 min", calories: "80 cal" },
  { name: "Jump Rope", category: "Cardio", duration: "20 min", calories: "250 cal" },
];

const Index = () => {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  useEffect(() => {
    const savedLogs = localStorage.getItem("workoutLogs");
    if (savedLogs) {
      setWorkoutLogs(JSON.parse(savedLogs));
    }
  }, []);

  const addWorkout = (exercise: { name: string; calories: string }) => {
    const newLog: WorkoutLog = {
      id: Date.now().toString(),
      exercise: exercise.name,
      date: new Date().toISOString(),
      calories: parseInt(exercise.calories),
    };
    const updatedLogs = [...workoutLogs, newLog];
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("workoutLogs", JSON.stringify(updatedLogs));
    
    toast({
      title: "Workout Added! 💪",
      description: `${exercise.name} has been logged to your workouts.`,
    });
  };

  const totalWorkouts = workoutLogs.length;
  const totalCalories = workoutLogs.reduce((sum, log) => sum + log.calories, 0);
  const thisWeekWorkouts = workoutLogs.filter((log) => {
    const logDate = new Date(log.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate >= weekAgo;
  }).length;

  const filteredExercises = selectedCategory === "All" 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground py-8 px-4 shadow-glow">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">FitTrack Pro</h1>
          <p className="text-primary-foreground/90">Your personal fitness companion</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Workouts"
            value={totalWorkouts}
            icon={Activity}
            subtitle="All time"
          />
          <StatsCard
            title="This Week"
            value={thisWeekWorkouts}
            icon={TrendingUp}
            subtitle="Last 7 days"
          />
          <StatsCard
            title="Calories Burned"
            value={totalCalories}
            icon={Flame}
            subtitle="Total"
          />
          <StatsCard
            title="Streak"
            value={`${thisWeekWorkouts} days`}
            icon={Target}
            subtitle="Keep it up!"
          />
        </div>

        {/* Timer Section */}
        <WorkoutTimer />

        {/* Exercise Library */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Exercise Library</h2>
          </div>
          
          <Tabs defaultValue="All" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Strength">Strength</TabsTrigger>
              <TabsTrigger value="Cardio">Cardio</TabsTrigger>
              <TabsTrigger value="Flexibility">Flex</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredExercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                {...exercise}
                onAdd={() => addWorkout(exercise)}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {workoutLogs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Recent Activity</h2>
            <div className="space-y-2">
              {workoutLogs.slice(-5).reverse().map((log) => (
                <div
                  key={log.id}
                  className="p-4 bg-card rounded-lg border flex justify-between items-center hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-semibold">{log.exercise}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(log.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{log.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
