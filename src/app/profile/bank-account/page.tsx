
'use client';

import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  CreditCard,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const GuidelineItem = ({ number, text }: { number: number; text: string }) => (
    <div className="flex items-start gap-3">
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {number}
        </div>
        <p className="text-sm text-muted-foreground">{text}</p>
    </div>
);

export default function BankAccountPage() {
    const router = useRouter();
    const { toast } = useToast();

    const bankAccounts = [
        {
            bankName: 'State Bank of India',
            accountNumber: 'XXXX XXXX 1234',
            ifsc: 'SBIN0001234',
            isPrimary: true,
        },
    ];

    const guidelines = [
      "Ensure that the account is in your name and matches your KYC details.",
      "Double-check your account number and IFSC code to avoid payment failures.",
      "Payments are processed every day at 7 AM for the previous day's earnings.",
      "For any payment-related issues, please contact our support team.",
    ];
    
    const handleAction = (title: string, description: string) => {
      toast({ title, description });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-lg font-semibold">Bank Account</h1>
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
                <Alert className="border-primary/50 bg-primary/10">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <AlertTitle className="font-bold text-primary">Important</AlertTitle>
                    <AlertDescription className="text-primary/90">
                        Your earnings will be transferred to your primary bank account. Make sure your account details are correct.
                    </AlertDescription>
                </Alert>

                <div>
                    <div className="flex items-center justify-between px-1 mb-3">
                        <h2 className="text-lg font-semibold">Your Bank Accounts</h2>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Add New Account', 'This feature is coming soon.')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Account
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {bankAccounts.map((account, index) => (
                             <Card key={index} className="transition-all duration-300">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <h3 className="font-bold">{account.bankName}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{account.accountNumber}</p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">IFSC: {account.ifsc}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                      {account.isPrimary && <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 font-medium">Primary</Badge>}
                                      <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => handleAction('Edit Account', 'This feature is coming soon.')}>
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleAction('Delete Account', 'This feature is coming soon.')}>
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg">Important Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                       {guidelines.map((text, index) => (
                           <GuidelineItem key={index} number={index + 1} text={text} />
                       ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
