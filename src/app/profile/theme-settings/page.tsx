'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const themes = [
  { name: 'Default', primary: '221 83% 53%', background: '240 5% 96%', accent: '340 82% 62%' },
  { name: 'Forest', primary: '142 76% 36%', background: '140 20% 95%', accent: '158 56% 45%' },
  { name: 'Ocean', primary: '210 89% 53%', background: '216 34% 97%', accent: '186 96% 40%' },
  { name: 'Sunset', primary: '24 96% 53%', background: '20 40% 97%', accent: '358 91% 65%' },
  { name: 'Rose', primary: '346 89% 60%', background: '345 60% 97%', accent: '259 90% 67%' },
  { name: 'Indigo', primary: '255 85% 65%', background: '240 10% 97%', accent: '230 90% 68%' },
];

export default function ThemeSettingsPage() {
    const router = useRouter();
    const { toast } = useToast();

    const applyTheme = (theme: typeof themes[0]) => {
        const root = document.documentElement;
        root.style.setProperty('--primary', theme.primary);
        
        // Note: Changing the background might be jarring. 
        // For a smoother experience, we're keeping the background consistent for now.
        // To enable background theming, uncomment the line below.
        // root.style.setProperty('--background', theme.background);

        root.style.setProperty('--accent', theme.accent);

        toast({
            title: 'Theme Applied!',
            description: `You've switched to the ${theme.name} theme.`,
        });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-lg font-semibold">Theme Settings</h1>
                </div>
            </header>
            <main className="flex-1 space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Palette className="h-5 w-5 text-primary" />
                            Select a Theme
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {themes.map((theme) => (
                            <div key={theme.name} onClick={() => applyTheme(theme)} className="cursor-pointer group">
                                <Card className="p-0 overflow-hidden transition-all group-hover:ring-2 group-hover:ring-primary group-hover:shadow-lg">
                                    <div className="p-4 flex flex-col gap-2 bg-card">
                                        <div className="h-6 rounded-md" style={{ backgroundColor: `hsl(${theme.primary})` }}></div>
                                        <div className="h-4 rounded-md w-3/4" style={{ backgroundColor: `hsl(${theme.accent})` }}></div>
                                        <div className="h-4 rounded-md w-1/2" style={{ backgroundColor: `hsl(${theme.primary})`, opacity: 0.6 }}></div>
                                    </div>
                                    <div className="p-3 bg-muted/50">
                                        <p className="font-semibold text-center text-sm">{theme.name}</p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
