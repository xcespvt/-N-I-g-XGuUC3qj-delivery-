
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Landmark, Wallet, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { floatingCashDetails } from '@/lib/data';

const todaysOrders = [
    { id: 'ORD-123', amount: 350 },
    { id: 'ORD-124', amount: 200 },
    { id: 'ORD-125', amount: 300 },
    { id: 'ORD-126', amount: 150 },
    { id: 'ORD-127', amount: 850 },
];

const totalFloatingCash = floatingCashDetails.floatingCash;

export default function SettlementPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const handlePayNow = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            // Simulate success/failure randomly
            const success = Math.random() > 0.1; // 90% success rate
            
            if (success) {
                toast({
                    title: "Payment Successful!",
                    description: "Your floating cash has been settled.",
                });
                setIsSuccessful(true);
                // Redirect after showing success message
                setTimeout(() => {
                    router.push('/earnings?settled=true');
                }, 2000);
            } else {
                toast({
                    variant: "destructive",
                    title: "Payment Failed",
                    description: "Could not process your settlement. Please try again.",
                });
                setIsProcessing(false);
            }
        }, 1500);
    };

    if (isSuccessful) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 text-center">
                <CheckCircle className="h-24 w-24 text-green-500 animate-pulse" />
                <h1 className="mt-6 text-2xl font-bold">Settlement Successful!</h1>
                <p className="mt-2 text-muted-foreground">Your floating cash is now zero.</p>
                <p className="mt-1 text-muted-foreground">Redirecting you to the earnings page...</p>
            </div>
        );
    }
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold">Settle Floating Cash</h1>
                <div className="w-8" />
            </header>

            <main className="flex-1 space-y-6 p-4 pb-28">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Today's Floating Cash Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-border">
                            {todaysOrders.map(order => (
                                <div key={order.id} className="flex items-center justify-between py-3">
                                    <p className="text-muted-foreground">Order <span className="font-mono">{order.id}</span></p>
                                    <p className="font-semibold">₹{order.amount.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between border-t-2 pt-4 mt-2">
                            <p className="text-lg font-bold">Total to Settle</p>
                            <p className="text-2xl font-bold text-primary">₹{totalFloatingCash.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Select Mode of Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                             <div>
                                <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                                <Label htmlFor="upi" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                    <Wallet className="mb-3 h-6 w-6" />
                                    UPI
                                </Label>
                             </div>
                             <div>
                                <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                                <Label htmlFor="netbanking" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                    <Landmark className="mb-3 h-6 w-6" />
                                    NetBanking
                                </Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
            </main>

            <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-background/90 p-4 backdrop-blur-sm">
                <Button size="lg" className="w-full" onClick={handlePayNow} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Pay Now (₹${totalFloatingCash.toLocaleString()})`}
                </Button>
            </div>
        </div>
    );
}
