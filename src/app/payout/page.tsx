
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Landmark, Wallet, CheckCircle, Plus, AlertCircle, ChevronDown, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const availableBalance = 2458;
const MIN_WITHDRAWAL = 100;
const earningsBreakdown = [
    { label: 'Delivery Earnings', amount: 1850 },
    { label: 'Incentives', amount: 400 },
    { label: 'Referral Bonus', amount: 108 },
    { label: 'Membership Bonus', amount: 50 },
    { label: 'Petrol Incentive', amount: 50 },
    { label: 'TDS', amount: -50, isDeduction: true },
    { label: 'Penalties', amount: -25, isDeduction: true },
];

const totalEarnings = earningsBreakdown.reduce((acc, item) => acc + item.amount, 0);

const bankAccounts = [
    {
        id: 'acc1',
        bankName: 'State Bank of India',
        accountNumber: '**** 1234',
    },
    {
        id: 'acc2',
        bankName: 'HDFC Bank',
        accountNumber: '**** 5678',
    },
];

export default function PayoutPage() {
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('acc1');
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const handlePayout = () => {
        setIsConfirming(false);
        // Simulate API call
        setTimeout(() => {
            setIsSuccessful(true);
            setTimeout(() => {
                router.push('/earnings');
            }, 3000);
        }, 500);
    };

    if (isSuccessful) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 text-center">
                <CheckCircle className="h-24 w-24 text-green-500 animate-pulse" />
                <h1 className="mt-6 text-2xl font-bold">Request Submitted!</h1>
                <p className="mt-2 max-w-sm text-muted-foreground">We've received your withdrawal request. You should receive the money in your account within 24 hours.</p>
                <p className="mt-4 text-sm text-muted-foreground">Redirecting you to the earnings page...</p>
            </div>
        );
    }

    const parsedAmount = parseFloat(amount);
    const isAmountValid = !isNaN(parsedAmount) && parsedAmount >= MIN_WITHDRAWAL && parsedAmount <= totalEarnings;

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold">Request Payout</h1>
                <div className="w-8" />
            </header>

            <main className="flex-1 space-y-6 p-4 pb-32">
                <Card className="overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Wallet className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Available Balance</p>
                                <p className="text-3xl font-bold">₹{totalEarnings.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full mt-2">
                            <AccordionItem value="breakdown" className="border-b-0">
                                <AccordionTrigger className="text-sm font-medium text-primary hover:no-underline -mx-1 px-1 py-1.5">
                                    View Earnings Breakdown
                                </AccordionTrigger>
                                <AccordionContent className="pt-3">
                                    <div className="space-y-3 rounded-lg border bg-muted/50 p-3">
                                        {earningsBreakdown.map(item => (
                                            <div key={item.label} className="flex justify-between text-sm">
                                                <p className="text-muted-foreground">{item.label}</p>
                                                <p className={`font-semibold ${item.isDeduction ? 'text-destructive' : ''}`}>
                                                  {item.isDeduction ? '-' : ''}₹{Math.abs(item.amount).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        ))}
                                        <div className="border-t pt-3 mt-3 flex justify-between text-base font-bold">
                                            <p>Total</p>
                                            <p>₹{totalEarnings.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Withdrawal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="amount" className="font-semibold">Enter Amount</Label>
                            <div className="relative mt-2">
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pr-16 text-lg h-12"
                                />
                                <Button
                                    variant="ghost"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
                                    onClick={() => setAmount(String(totalEarnings))}
                                >
                                    Max
                                </Button>
                            </div>
                            {amount && !isAmountValid && (
                                <p className="text-xs text-destructive mt-1.5">Please enter an amount between ₹{MIN_WITHDRAWAL} and ₹{totalEarnings}.</p>
                            )}
                            {(!amount || isAmountValid) && (
                                <p className="text-xs text-muted-foreground mt-1.5">Minimum withdrawal amount is ₹{MIN_WITHDRAWAL}.</p>
                            )}
                        </div>

                        <div>
                            <Label className="font-semibold">Select Bank Account</Label>
                            <RadioGroup value={selectedAccount} onValueChange={setSelectedAccount} className="mt-2 space-y-3">
                                {bankAccounts.map(account => (
                                    <Label key={account.id} htmlFor={account.id} className="flex items-center gap-4 rounded-md border p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                                        <RadioGroupItem value={account.id} id={account.id} />
                                        <div className="flex-1">
                                            <p className="font-semibold">{account.bankName}</p>
                                            <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                                        </div>
                                        <Landmark className="h-6 w-6 text-muted-foreground" />
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                        <Link href="/profile/bank-account" passHref>
                            <Button variant="outline" className="w-full mt-2">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Bank Account
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Please Note</AlertTitle>
                    <AlertDescription>
                        Withdrawals are processed once daily. Requests made before 5 PM are typically credited within 24 hours.
                    </AlertDescription>
                </Alert>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/90 p-4 backdrop-blur-sm sm:static sm:pb-4">
                 <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
                    <AlertDialogTrigger asChild>
                        <Button size="lg" className="w-full" disabled={!isAmountValid}>
                            Submit Request
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                            <ShieldCheck className="h-10 w-10 text-primary" />
                        </div>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
                            <AlertDialogDescription>
                                You are about to withdraw <span className="font-bold text-foreground">₹{amount}</span>. Please confirm this is correct.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={handlePayout}>Continue</AlertDialogAction>
                            <AlertDialogCancel>Recheck</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
