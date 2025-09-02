
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, Trophy } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { leaderboardData } from '@/lib/data';
import type { LeaderboardUser } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const rankConfig: { [key: number]: { icon: React.ElementType, color: string, ringColor: string } } = {
    1: { icon: Trophy, color: 'text-yellow-400', ringColor: 'ring-yellow-400' },
    2: { icon: Trophy, color: 'text-gray-400', ringColor: 'ring-gray-400' },
    3: { icon: Trophy, color: 'text-orange-400', ringColor: 'ring-orange-400' },
};

const LeaderboardItem = ({ user, rank }: { user: LeaderboardUser, rank: number }) => {
    const config = rankConfig[rank as keyof typeof rankConfig];

    return (
        <Card className={cn(
            "p-3 flex items-center gap-4 transition-all",
            user.isCurrentUser && "bg-primary/10 border-primary"
        )}>
            <div className="font-bold text-lg w-6 text-center text-muted-foreground">{rank}</div>
            <Avatar className={cn("h-12 w-12 border-2", config?.ringColor)} data-ai-hint="person face">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="font-bold text-base flex items-center gap-2">
                    {user.name}
                    {config && <config.icon className={cn("h-5 w-5", config.color)} />}
                </p>
                <p className="text-sm text-muted-foreground">{user.score} Deliveries</p>
            </div>
            {user.isCurrentUser && <Badge className="bg-primary/20 text-primary border-primary/30">You</Badge>}
        </Card>
    );
};

export default function LeaderboardPage() {
    const router = useRouter();
    const currentUser = leaderboardData.find(u => u.isCurrentUser);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold">Leaderboard</h1>
                <div className="w-8" />
            </header>

            <main className="flex-1 space-y-4 p-4">
                <Card className="overflow-hidden transition-all duration-300">
                    <div className="relative h-40 w-full">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="Leaderboard banner"
                            layout="fill"
                            objectFit="cover"
                            className="opacity-20"
                            data-ai-hint="trophy award"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex flex-col items-center justify-center p-4 text-center">
                            <Trophy className="h-12 w-12 text-primary" />
                            <h2 className="text-2xl font-bold mt-2">Weekly Challenge</h2>
                            <p className="text-muted-foreground mt-1 text-sm">Top partners win exclusive rewards!</p>
                        </div>
                    </div>
                </Card>
                
                <Tabs defaultValue="weekly" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="weekly" className="mt-4">
                        {currentUser && (
                            <Card className="mb-4 bg-primary text-primary-foreground transition-all duration-300">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-white/20 p-2">
                                            <Star className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-primary-foreground/80">Your Rank</p>
                                            <p className="text-lg font-bold">#{currentUser.rank}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{currentUser.score} Deliveries</p>
                                        <p className="text-sm font-medium text-primary-foreground/80">Keep going!</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        <div className="space-y-3">
                            {leaderboardData.sort((a, b) => a.rank - b.rank).map((user) => (
                                <LeaderboardItem key={user.id} user={user} rank={user.rank} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="monthly" className="mt-4 text-center text-muted-foreground py-10">
                        <p>Monthly leaderboard is coming soon!</p>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
