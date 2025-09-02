
'use client';

import type { LucideIcon } from 'lucide-react';
import { BookOpen, ChevronRight, FileText, HelpCircle, Landmark, LogOut, MessageSquare, Palette, Phone, PlayCircle, Settings, Shield, ShoppingBag, Star, Stethoscope, Tag, Truck, User, Bell, Edit, Timer, CheckCheck, Receipt } from 'lucide-react';
import Link from 'next/link';
import { profileData, achievementsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/bottom-nav';

const iconMap: { [key: string]: LucideIcon } = {
  User, FileText, Landmark, Tag, Shield, Stethoscope, BookOpen, ShoppingBag, Truck, Settings, Palette, Bell, HelpCircle, Phone, MessageSquare, PlayCircle, Receipt
};

const ListItem = ({ item }: { item: any }) => {
  const { theme, setTheme } = useTheme();
  const [isToggled, setIsToggled] = useState(false);
  const Icon = item.icon;

  const badgeClass = cn({
    "bg-primary/10 text-primary": item.badgeColor === 'blue' || !item.badgeColor,
    "bg-green-100 text-green-700": item.badgeColor === 'green',
  });

  const isDarkModeToggle = item.label === 'Dark Mode';

  const handleToggle = (checked: boolean) => {
    if (isDarkModeToggle) {
      setTheme(checked ? 'dark' : 'light');
    } else {
      setIsToggled(checked);
    }
  };

  const ItemContent = (
    <div className="flex items-center justify-between py-3 -mx-4 px-4 rounded-md">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <span className="font-medium">{item.label}</span>
      </div>
      <div className="flex items-center gap-2">
        {item.badge && <Badge variant="outline" className={cn("border-0 font-semibold", badgeClass)}>{item.badge}</Badge>}
        {item.isSwitch ? (
          <Switch
            checked={isDarkModeToggle ? theme === 'dark' : isToggled}
            onCheckedChange={handleToggle}
          />
        ) : (
          (item.href || !item.badge) && <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
    </div>
  );
  
  if (item.href) {
    return <Link href={item.href} className="block transition-all duration-200 hover:bg-muted/50 -mx-4 px-4 rounded-md">{ItemContent}</Link>;
  }

  return <div className="cursor-pointer transition-all duration-200 hover:bg-muted/50 -mx-4 px-4 rounded-md">{ItemContent}</div>;
};

const SettingsCard = ({ title, items }: { title: string, items: any[] }) => (
  <Card>
    <CardContent className="p-4">
      <h3 className="font-semibold text-primary mb-2">{title}</h3>
      <div className="divide-y divide-border">
        {items.map((item) => <ListItem key={item.label} item={item} />)}
      </div>
    </CardContent>
  </Card>
);

const AchievementsCard = () => {
  const achievedCount = achievementsData.filter(a => a.achieved).length;
  
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-lg">Achievements</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <p>You've unlocked {achievedCount} of {achievementsData.length} badges.</p>
          <Link href="/profile/achievements" className="font-bold text-primary hover:underline">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          {achievementsData.slice(0, 4).map(achievement => (
            <div key={achievement.id} className="flex flex-col items-center gap-1 group">
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full bg-muted transition-all",
                achievement.achieved && "bg-primary/10 ring-2 ring-primary/50"
              )}>
                <achievement.icon className={cn("h-7 w-7", achievement.achieved ? "text-primary" : "text-muted-foreground")} />
              </div>
              <p className={cn("text-xs font-medium", achievement.achieved ? "text-foreground" : "text-muted-foreground")}>{achievement.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


export default function ProfilePage() {
  const { name, phone, rating, avatarUrl, stats, performance, accountSettings, partnerBenefits, store, appSettings, helpAndSupport } = profileData;
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
      <main className="flex flex-1 flex-col gap-4 p-4">
        
        <Card className="overflow-hidden">
          <CardContent className="p-4 text-center bg-gradient-to-b from-primary/10 via-card to-card">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md mx-auto" data-ai-hint="person face">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mt-3">{name}</h2>
              <p className="text-muted-foreground">{phone}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{rating}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-4">
                  {stats.map(stat => (
                      <div key={stat.label} className="bg-primary/10 rounded-lg p-2">
                          <p className="text-xl font-bold text-primary">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                  ))}
              </div>
              <Button className="w-full" onClick={() => router.push('/profile/personal-information')}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Performance</h3>
                    <Badge className="bg-green-100 text-green-700 border-0 font-medium">Excellent</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-4">
                        <Timer className="h-7 w-7 text-green-600 mb-1" />
                        <p className="text-2xl font-bold">{performance.onTimeDelivery}%</p>
                        <p className="text-xs text-muted-foreground">On-time</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-4">
                        <Star className="h-7 w-7 text-yellow-500 mb-1" />
                        <p className="text-2xl font-bold">{performance.customerRating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-4">
                        <CheckCheck className="h-7 w-7 text-primary mb-1" />
                        <p className="text-2xl font-bold">{performance.orderAcceptance}%</p>
                        <p className="text-xs text-muted-foreground">Acceptance</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <AchievementsCard />

        <SettingsCard title="Account Settings" items={accountSettings} />
        <SettingsCard title="Partner Benefits" items={partnerBenefits} />
        <SettingsCard title="Crevings Store" items={store} />
        <SettingsCard title="App Settings" items={appSettings} />
        <SettingsCard title="Help & Support" items={helpAndSupport} />

        <div className="text-center py-4">
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="ghost" className="text-destructive font-semibold hover:text-destructive hover:bg-destructive/10 text-base">
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                  </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl">
                   <SheetHeader className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-2">
                            <LogOut className="h-8 w-8 text-destructive" />
                        </div>
                        <SheetTitle>Are you sure you want to log out?</SheetTitle>
                        <SheetDescription>
                            You will need to sign in again to access your account.
                        </SheetDescription>
                  </SheetHeader>
                  <SheetFooter className="mt-4 flex flex-col gap-2">
                        <SheetClose asChild>
                            <Button
                              className={buttonVariants({ variant: "destructive", size: 'lg' })}
                              onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                           <Button variant="ghost" size="lg">Cancel</Button>
                        </SheetClose>
                  </SheetFooter>
              </SheetContent>
          </Sheet>
            <div className="mt-4">
                <p className="text-xs text-muted-foreground">Crevings Delivery Partner App</p>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
