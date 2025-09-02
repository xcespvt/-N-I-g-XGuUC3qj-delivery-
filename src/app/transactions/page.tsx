
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { allTransactions } from '@/lib/data';
import type { Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
    <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
                <p className="font-semibold">{transaction.type}</p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-green-600">+₹{transaction.amount}</p>
            <p className="text-xs text-muted-foreground">{transaction.status}</p>
        </div>
    </div>
);

export default function TransactionsPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Downloading Statement",
            description: "Your transaction statement is being generated.",
        });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold">Transaction History</h1>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
                    <Download className="h-5 w-5" />
                    <span className="sr-only">Download</span>
                </Button>
            </header>

            <main className="flex-1 p-4">
                <Card className="transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-base">All Transactions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border px-6">
                            {allTransactions.map(transaction => (
                                <TransactionItem key={transaction.id} transaction={transaction} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
