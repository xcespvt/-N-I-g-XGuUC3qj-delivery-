
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { notifications } from '@/lib/data';
import type { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';

const NotificationItem = ({ notification }: { notification: Notification }) => (
  <div className="flex items-start gap-4 p-4 transition-all hover:bg-muted/50 hover:shadow-md hover:-translate-y-0.5">
    <div
      className={cn(
        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
        notification.read ? 'bg-muted' : 'bg-primary/10'
      )}
    >
      <notification.icon
        className={cn(
          'h-5 w-5',
          notification.read ? 'text-muted-foreground' : 'text-primary'
        )}
      />
    </div>
    <div className="flex-1">
      <p className={cn('font-semibold', notification.read && 'text-muted-foreground')}>
        {notification.title}
      </p>
      <p className={cn('text-sm text-muted-foreground', notification.read && 'text-muted-foreground/70')}>
        {notification.description}
      </p>
      <p className={cn('text-xs text-muted-foreground mt-1', notification.read && 'text-muted-foreground/70')}>
        {notification.time}
      </p>
    </div>
    {!notification.read && (
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></div>
    )}
  </div>
);

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-lg font-semibold">Notifications</h1>
        <div className="w-8" />
      </header>

      <main className="flex-1">
        <Card className="m-4 rounded-xl border-0 shadow-none">
            <CardContent className="p-0">
                <div className="divide-y">
                    {notifications.map((item) => (
                        <NotificationItem key={item.id} notification={item} />
                    ))}
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
