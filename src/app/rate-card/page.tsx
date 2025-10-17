
'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  MoreVertical,
  Package,
  Search,
  Wallet,
  Clock,
  Map,
  Bike
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const PayComponentCard = ({
  icon: Icon,
  title,
  description,
  amount,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  amount: string;
}) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <p className="font-bold text-lg">{amount}</p>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  </div>
);


export default function RateCardPage() {
  const router = useRouter();

  const basePay = [
    {
      icon: Package,
      title: 'Single Order',
      description: 'Minimum earning for a single delivery.',
      amount: '₹20',
    },
    {
      icon: Package,
      title: 'Multi Order',
      description: 'For additional orders in the same trip.',
      amount: '₹20 + ₹20',
    },
  ];

  const otherPay = [
    {
      icon: Map,
      title: 'Distance Pay',
      description: 'Per kilometer from restaurant to customer.',
      amount: '₹5/km',
    },
    {
        icon: Clock,
        title: 'Wait Time Pay',
        description: 'After 5 mins at the restaurant.',
        amount: '₹1/min',
    },
     {
        icon: Bike,
        title: 'Surge Pay',
        description: 'Extra earnings during high demand.',
        amount: 'Variable',
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-bold">Rate Card</h1>
            <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Search className="h-5 w-5" />
                </Button>
                 <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
        </header>

        <main className="flex-1 space-y-6 p-4">
            <Card className="overflow-hidden shadow-lg bg-gradient-to-br from-primary via-blue-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
                        <Wallet className="h-8 w-8" />
                    </div>
                    <h2 className="text-xl font-bold">Average Earnings</h2>
                    <p className="mt-1 text-4xl font-extrabold tracking-tight">₹20 - ₹50</p>
                    <p className="mt-2 text-xs text-white/80 max-w-xs mx-auto">
                        is the expected per trip earning in your area. You'll be paid right for your hard work!
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-primary mb-2">Guaranteed Base Pay</h3>
                    <div className="divide-y divide-border">
                        {basePay.map(item => (
                            <PayComponentCard key={item.title} {...item} />
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-primary mb-2">Other Pay Components</h3>
                    <div className="divide-y divide-border">
                        {otherPay.map(item => (
                            <PayComponentCard key={item.title} {...item} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-primary/90">"The more you deliver, the more you earn! It's that simple."</p>
              </CardContent>
            </Card>
        </main>
    </div>
  );
}
