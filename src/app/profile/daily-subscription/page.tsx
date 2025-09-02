
'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Bell,
  Check,
  Zap,
  Calendar,
  Clock,
  Info,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subscriptionHistory, subscriptionStats } from '@/lib/data';
import type { SubscriptionHistoryItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const benefits = {
    "Core Features": [
        "Extra petrol incentive on every order",
        "Exclusive member bonus on select orders",
    ],
    "Merchandise": [
        "FREE delivery bag, t-shirt, and raincoat",
        "70% discount on helmet and hoodies",
    ],
    "Health & Education": [
        "FREE weekly medical check-up for you & your family",
        "Special education incentives for your children",
        "60% reimbursement of medicine expense",
    ],
    "Insurance": [
        "₹5,00,000 Accidental Insurance"
    ]
};

const SubscriptionPlanCard = ({ onActivate }: { onActivate: () => void }) => (
    <Card className="border-primary/30 shadow-lg transition-all duration-300">
        <CardContent className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-primary">Daily Power Boost</h2>
                <p className="text-muted-foreground mt-1">Supercharge your earnings with our daily subscription.</p>
            </div>
            
            <div>
                <span className="text-4xl font-extrabold">₹20</span>
                <span className="text-muted-foreground">/day + GST</span>
                <p className="text-sm font-semibold text-green-600 mt-1">Total Savings of ₹3000</p>
            </div>
            
            <div className="space-y-4">
                {Object.entries(benefits).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="font-semibold mb-3">{category}</h3>
                        <ul className="space-y-2.5">
                            {items.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

             <SheetTrigger asChild>
                <Button className="w-full" size="lg">
                    Activate Subscription
                </Button>
            </SheetTrigger>
        </CardContent>
    </Card>
);

const HistoryItem = ({ item }: { item: SubscriptionHistoryItem }) => (
    <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="font-semibold">{item.date}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-primary">₹{item.amount.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{item.status}</p>
        </div>
    </div>
);

export default function DailySubscriptionPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
    const [refundReason, setRefundReason] = useState('');

    const handleConfirmActivation = () => {
        toast({
            title: "Processing Payment...",
            description: "Redirecting to your UPI app for payment.",
        });

        setTimeout(() => {
            setIsSubscribed(true);
            toast({
                title: "Subscription Activated!",
                description: "Your daily power boost is now active for 24 hours.",
            });
        }, 2500);
    };
    
    const handleRefundSubmit = () => {
        if (refundReason === 'no-orders') {
            setIsRefundDialogOpen(false);
            toast({
                title: "Refund Request Submitted",
                description: "We have received your request and will process it within 24-48 hours.",
            });
            setRefundReason(''); // Reset for next time
        }
    };


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-lg font-semibold">Daily Subscription</h1>
                </div>
                <div className="relative">
                    <Link href="/notifications">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-white pointer-events-none">3</span>
                    </Link>
                </div>
            </header>

            <main className="flex-1 space-y-6 p-4">
                <Sheet>
                    <SubscriptionPlanCard onActivate={() => {}} />
                     <SheetContent side="bottom" className="rounded-t-3xl">
                        <SheetHeader className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                                <Zap className="h-8 w-8 text-primary" />
                            </div>
                            <SheetTitle>Confirm Subscription</SheetTitle>
                            <SheetDescription>
                                You are about to pay <span className="font-bold text-foreground">₹23.60</span> via UPI to activate your Daily Power Boost for 24 hours.
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter className="mt-4 flex-col gap-2">
                            <SheetClose asChild>
                                <Button size="lg" onClick={handleConfirmActivation}>Confirm & Pay</Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button size="lg" variant="ghost">Cancel</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                <div className="mt-6 flex items-center justify-between rounded-lg border p-3 bg-card shadow-sm">
                    <Label htmlFor="auto-renew" className="flex flex-col space-y-1 cursor-pointer">
                        <span className="font-semibold">Auto-Renew Subscription</span>
                        <span className="font-normal leading-snug text-muted-foreground text-sm">
                            Automatically renew your subscription daily.
                        </span>
                    </Label>
                    <Switch id="auto-renew" aria-label="Toggle auto-renewal" />
                </div>

                <Sheet open={isRefundDialogOpen} onOpenChange={(open) => {
                    setIsRefundDialogOpen(open);
                    if (!open) setRefundReason(''); // Reset on close
                }}>
                    <Alert className="mt-6">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Refund Policy</AlertTitle>
                        <AlertDescription>
                            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <span>
                                    If you don't receive any order within 12 hours of subscribing, you can apply for a refund.
                                </span>
                                 <SheetTrigger asChild>
                                    <Button variant="link" className="p-0 h-auto text-primary sm:pl-4 sm:text-right flex-shrink-0">Apply for Refund</Button>
                                </SheetTrigger>
                            </div>
                        </AlertDescription>
                    </Alert>

                    <SheetContent side="bottom" className="rounded-t-3xl">
                         <SheetHeader className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                                <Info className="h-8 w-8 text-primary" />
                            </div>
                            <SheetTitle>Apply for Subscription Refund</SheetTitle>
                            <SheetDescription>
                                Please select the reason for your refund request. Refunds are subject to verification.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                            <RadioGroup onValueChange={setRefundReason} value={refundReason}>
                                <Label htmlFor="refund-reason-no-orders" className="flex items-center gap-3 rounded-md border p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                                    <RadioGroupItem value="no-orders" id="refund-reason-no-orders" />
                                    <span>I did not receive any orders in the last 12 hours.</span>
                                </Label>
                            </RadioGroup>
                        </div>
                        <SheetFooter className="flex-col gap-2">
                            <SheetClose asChild>
                                <Button size="lg" onClick={handleRefundSubmit} disabled={refundReason !== 'no-orders'}>
                                    Submit Request
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button size="lg" variant="ghost">Cancel</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>


                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Subscription History</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pt-0">
                        <div className="divide-y divide-border">
                            {subscriptionHistory.map((item) => (
                                <HistoryItem key={item.id} item={item} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Your Subscription Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-primary">₹{subscriptionStats.extraEarnings}</p>
                                <p className="text-sm text-muted-foreground">Extra Earnings</p>
                            </div>
                             <div>
                                <p className="text-2xl font-bold text-primary">{subscriptionStats.priorityOrders}</p>
                                <p className="text-sm text-muted-foreground">Priority Orders</p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Subscribed for {subscriptionStats.subscribedDays} days this month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-primary/90">"A small investment for a <span className="font-bold">big return</span>. That's how the smart ones roll!"</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
