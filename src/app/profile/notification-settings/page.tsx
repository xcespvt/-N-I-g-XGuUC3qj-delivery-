'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Mail, MessageSquare, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const NotificationItem = ({ icon: Icon, title, description, checked, onCheckedChange }: { icon: LucideIcon; title: string; description: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
    <div className="flex items-start justify-between rounded-lg border p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary">
        <div className="flex items-start gap-4">
            <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
);


export default function NotificationSettingsPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState({
        newOrders: { push: true, email: false, sms: true },
        orderUpdates: { push: true, email: true, sms: false },
        promotions: { push: true, email: true, sms: false },
        earningsUpdates: { push: true, email: true, sms: true },
    });

    const handleToggle = (category: keyof typeof notifications, type: keyof typeof notifications.newOrders) => {
        setNotifications(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: !prev[category][type],
            }
        }));
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-lg font-semibold">Notification Settings</h1>
                </div>
            </header>
            <main className="flex-1 space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Order Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <NotificationItem
                            icon={Truck}
                            title="New Delivery Orders"
                            description="Get notified about new delivery opportunities"
                            checked={notifications.newOrders.push}
                            onCheckedChange={(checked) => handleToggle('newOrders', 'push')}
                        />
                         <NotificationItem
                            icon={Bell}
                            title="Order Status Updates"
                            description="Receive updates on pick-up and delivery status"
                            checked={notifications.orderUpdates.push}
                            onCheckedChange={(checked) => handleToggle('orderUpdates', 'push')}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Other Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <NotificationItem
                            icon={MessageSquare}
                            title="Promotions & Incentives"
                            description="Updates on new bonuses and offers"
                            checked={notifications.promotions.push}
                            onCheckedChange={(checked) => handleToggle('promotions', 'push')}
                        />
                         <NotificationItem
                            icon={Mail}
                            title="Earnings & Payouts"
                            description="Notifications about your earnings and weekly payouts"
                            checked={notifications.earningsUpdates.push}
                            onCheckedChange={(checked) => handleToggle('earningsUpdates', 'push')}
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
