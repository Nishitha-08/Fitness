import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const WorkoutTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-8 bg-gradient-primary text-primary-foreground shadow-glow">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Workout Timer</h2>
        <div className="text-6xl font-bold tracking-wider font-mono">
          {formatTime(seconds)}
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={toggle}
            className="w-24"
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={reset}
            className="w-24 bg-white/10 hover:bg-white/20 border-white/30 text-white"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
