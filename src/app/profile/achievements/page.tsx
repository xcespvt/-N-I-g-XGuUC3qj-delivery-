
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { achievementsData } from '@/lib/data';
import type { Achievement } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const isLocked = !achievement.achieved;
    return (
        <Card className={cn(
            "transition-all duration-300",
            isLocked ? 'bg-muted/60' : 'bg-card'
        )}>
            <CardContent className="p-4 flex items-center gap-4">
                <div className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-lg flex-shrink-0",
                    isLocked ? "bg-muted-foreground/10" : "bg-primary/10"
                )}>
                    {isLocked ? (
                        <Lock className="h-8 w-8 text-muted-foreground/50" />
                    ) : (
                        <achievement.icon className="h-8 w-8 text-primary" />
                    )}
                </div>
                <div className="flex-1">
                    <h3 className={cn("font-bold text-base", isLocked && "text-muted-foreground")}>{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{achievement.description}</p>
                    {isLocked && achievement.progress !== undefined && (
                        <div className="mt-2">
                             <Progress value={achievement.progress} className="h-1.5" />
                             <p className="text-xs text-muted-foreground mt-1 text-right">{achievement.progress}% complete</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default function AchievementsPage() {
    const router = useRouter();
    const unlockedAchievements = achievementsData.filter(a => a.achieved);
    const lockedAchievements = achievementsData.filter(a => !a.achieved);
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold">Achievements</h1>
                <div className="w-8" />
            </header>

            <main className="flex-1 p-4">
                <Card className="mb-4 text-center bg-primary/10 border-primary/20 transition-all duration-300">
                    <CardContent className="p-4">
                        <Trophy className="h-10 w-10 text-primary mx-auto mb-2" />
                        <h2 className="text-xl font-bold">Your Trophy Cabinet</h2>
                        <p className="text-muted-foreground mt-1 text-sm">You've unlocked {unlockedAchievements.length} of {achievementsData.length} achievements. Keep it up!</p>
                    </CardContent>
                </Card>
                
                <Tabs defaultValue="unlocked" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="unlocked">
                            Unlocked ({unlockedAchievements.length})
                        </TabsTrigger>
                        <TabsTrigger value="locked">
                            Locked ({lockedAchievements.length})
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="unlocked" className="mt-4 space-y-3">
                        {unlockedAchievements.map(achievement => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </TabsContent>
                    <TabsContent value="locked" className="mt-4 space-y-3">
                         {lockedAchievements.map(achievement => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
