
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function WeekendBonusCard() {
  const completed = 6;
  const total = 15;
  const progress = (completed / total) * 100;

  return (
    <Card className="bg-primary text-primary-foreground transition-all duration-300">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">Weekend Bonus! 🎉</h3>
        <p className="text-sm text-primary-foreground/80 mt-1">
          Complete {total} deliveries this weekend and earn an extra ₹500 bonus!
        </p>
        <div className="mt-4">
            <Progress value={progress} className="h-2 [&>div]:bg-white bg-primary-foreground/30" />
            <div className="flex justify-between text-xs mt-1 text-primary-foreground/90">
                <span>{completed} completed</span>
                <span>{total}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
