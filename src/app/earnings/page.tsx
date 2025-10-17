
'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EarningsChart from "@/components/earnings-chart";
import { settlements, recentTransactions, monthlySummary, floatingCashDetails as initialFloatingCashDetails, weeklyEarnings } from "@/lib/data";
import type { Settlement } from "@/lib/types";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Info,
  Trophy,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import BottomNav from '@/components/bottom-nav';

const SettlementItem = ({ settlement }: { settlement: Settlement }) => (
  <div className="flex items-center justify-between py-3 transition-colors hover:bg-muted/50 -mx-4 px-4 rounded-md">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
        <ArrowUp className="h-5 w-5 text-green-600" />
      </div>
      <div>
        <p className="font-semibold">{`Settlement ${settlement.id}`}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{settlement.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{settlement.time}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-green-600">₹{settlement.amount.toLocaleString()}</p>
      <Badge
        variant="outline"
        className="mt-1 border-green-200 bg-green-50 text-xs font-medium text-green-700"
      >
        {settlement.status}
      </Badge>
    </div>
  </div>
);

function EarningsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [floatingCashDetails, setFloatingCashDetails] = useState(initialFloatingCashDetails);

  const incentiveLevels = [
    { level: 1, deliveries: 2, reward: 50 },
    { level: 2, deliveries: 15, reward: 150 },
    { level: 3, deliveries: 30, reward: 350 },
    { level: 4, deliveries: 50, reward: 700 },
    { level: 5, deliveries: 75, reward: 1200 },
  ];
  const currentDeliveries = 4; // Based on Today's Stats card

  useEffect(() => {
    if (searchParams.get('settled') === 'true') {
      setFloatingCashDetails(prev => ({ ...prev, floatingCash: 0, todayCollection: 0 }));
      // This is a bit of a hack to clear the query param from the URL without a full reload
      // to avoid the state being reset on a hot reload in dev.
      window.history.replaceState(null, '', '/earnings');
    }
  }, [searchParams]);

  const { floatingCash, cashLimit, todayCollection, todayDeposits } = floatingCashDetails;
  const progress = cashLimit > 0 ? (floatingCash / cashLimit) * 100 : 0;
  const { toast } = useToast();

  const handleAction = (title: string, description: string) => {
    toast({ title, description });
  };
  
  const handleSettleNow = () => {
    router.push('/settlement');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
      <main className="flex flex-1 flex-col gap-4 p-4">
        <Card className="bg-primary text-primary-foreground transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                <span className="font-medium">Wallet Balance</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-white/20" onClick={() => handleAction('Download Report', 'Your wallet report is being generated.')}>
                <Download className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-2 text-4xl font-bold">₹2,458</p>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Last payout: ₹1,200 on May 1, 2025
            </p>
            <Button className="mt-4 w-full bg-white text-primary hover:bg-white/90" onClick={() => router.push('/payout')}>
              Request Payout
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="earnings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="floating-cash">Floating Cash</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="incentives">Incentives</TabsTrigger>
          </TabsList>
          <TabsContent value="floating-cash" className="mt-4 space-y-4">
            <Card className="transition-all duration-300">
              <CardHeader className="flex-row items-center gap-2 space-y-0 p-4">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Floating Cash Management</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Floating Cash
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{floatingCash.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {progress.toFixed(0)}%
                  </p>
                </div>
                <Progress value={progress} className="mt-2 h-2 [&>div]:bg-green-500" />
                <p className="mt-1 text-right text-xs text-muted-foreground">
                  Cash Limit: ₹{cashLimit.toLocaleString()}
                </p>
                <Button className="mt-4 w-full" onClick={handleSettleNow} disabled={floatingCash === 0}>
                  {floatingCash > 0 ? 'Settle Now' : 'Cash Settled'}
                </Button>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Card className="bg-blue-50/50 shadow-inner">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        
                        <span>Today's Collection</span>
                      </div>
                      <p className="mt-1 text-xl font-bold">₹{todayCollection}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50/50 shadow-inner">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        
                        <span>Today's Deposits</span>
                      </div>
                      <p className="mt-1 text-xl font-bold">₹{todayDeposits}</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Recent Settlements</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pt-0">
                <div className="divide-y divide-border">
                  {settlements.map((s) => (
                    <SettlementItem key={s.id} settlement={s} />
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full" onClick={() => handleAction('Loading History', 'Opening your full settlement history.')}>
                  <Download className="mr-2 h-4 w-4" />
                  View Settlement History
                </Button>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="reconciliation" className="border-b-0">
                        <AccordionTrigger className="p-4 text-base font-semibold hover:no-underline">
                            View Daily Reconciliation Report
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-muted-foreground">
                            No reconciliation report for today.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>

            <Card className="transition-all duration-300">
                <Accordion type="single" collapsible className="w-full">
                     <AccordionItem value="transactions" className="border-b-0">
                         <AccordionTrigger className="p-4 text-base font-semibold hover:no-underline">
                             Recent Transactions
                         </AccordionTrigger>
                         <AccordionContent className="px-4 pb-4 text-muted-foreground">
                             No recent transactions.
                         </AccordionContent>
                     </AccordionItem>
                </Accordion>
            </Card>

          </TabsContent>
          <TabsContent value="earnings" className="mt-4 space-y-6">
            <div className="flex items-center justify-between px-1">
                <label htmlFor="period-select" className="text-sm font-medium text-muted-foreground">Select Period</label>
                <Select defaultValue="may">
                    <SelectTrigger id="period-select" className="w-[140px] h-9">
                        <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card className="transition-all duration-300">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Today's Earnings</p>
                        <p className="mt-1 text-2xl font-bold">₹458</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
                            <ArrowUp className="h-3 w-3" />
                            <span>12% from yesterday</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="transition-all duration-300">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Deliveries</p>
                        <p className="mt-1 text-2xl font-bold">4</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
                            <ArrowDown className="h-3 w-3" />
                            <span>2 less than yesterday</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-base font-semibold">This Month's Earning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Delivery Charges</p>
                        <p className="font-semibold">₹{monthlySummary.earningsBreakdown.deliveryCharges}</p>
                    </div>
                     <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Incentives</p>
                        <p className="font-semibold">₹{monthlySummary.earningsBreakdown.incentives}</p>
                    </div>
                     <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Referral Bonuses</p>
                        <p className="font-semibold">₹{monthlySummary.earningsBreakdown.referralBonuses}</p>
                    </div>
                     <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Membership Bonus</p>
                        <p className="font-semibold">₹{monthlySummary.earningsBreakdown.membershipBonus}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Petrol Incentive</p>
                        <p className="font-semibold">₹{monthlySummary.earningsBreakdown.petrolIncentive}</p>
                    </div>
                     <div className="flex items-center justify-between text-sm text-destructive">
                        <p>TDS</p>
                        <p className="font-semibold">-₹{monthlySummary.earningsBreakdown.tds}</p>
                    </div>
                     <div className="flex items-center justify-between text-sm text-destructive">
                        <p>Penalties</p>
                        <p className="font-semibold">-₹{monthlySummary.earningsBreakdown.penalties}</p>
                    </div>
                    <div className="border-t my-2"></div>
                    <div className="flex items-center justify-between text-base font-bold text-foreground">
                        <p>Total Earnings</p>
                        <p>₹{monthlySummary.totalEarnings}</p>
                    </div>
                </CardContent>
            </Card>

            <EarningsChart data={weeklyEarnings} />

            <Card className="bg-primary/10 border-primary/20 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Leaderboard
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">See how you rank against other delivery partners in your city and win weekly rewards!</p>
                  <Link href="/leaderboard" passHref>
                      <Button className="w-full">View Leaderboard</Button>
                  </Link>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-border -mx-6 px-6">
                        {recentTransactions.map((transaction) => (
                             <div key={transaction.id} className="flex items-center justify-between py-3.5">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Order Completed</p>
                                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">+₹{transaction.amount}</p>
                                    <p className="text-xs text-muted-foreground">Credited</p>
                                 </div>
                             </div>
                        ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => router.push('/transactions')}>View All Transactions</Button>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="incentives" className="mt-4 space-y-4">
            <Card className="transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Incentive Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="relative pl-6">
                  {incentiveLevels.map((item, index) => {
                      const isCompleted = currentDeliveries >= item.deliveries;
                      const isLast = index === incentiveLevels.length - 1;

                      return (
                        <div key={item.level} className="relative flex items-start pb-8">
                          {!isLast && (
                            <div className={cn(
                              'absolute top-4 left-4 h-full w-0.5 -translate-x-1/2',
                              isCompleted ? 'bg-primary' : 'bg-border'
                            )} />
                          )}
                          <div className={cn(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full z-10 mr-4',
                              isCompleted ? 'bg-primary' : 'bg-background border-2'
                          )}>
                              {isCompleted ? (
                                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              ) : (
                                  <Trophy className='h-4 w-4 text-muted-foreground' />
                              )}
                          </div>
                          <div className="pt-1.5">
                            <p className={cn(
                                'font-bold',
                                isCompleted ? 'text-foreground' : 'text-muted-foreground'
                            )}>
                              Level {item.level}: Complete {item.deliveries} deliveries
                            </p>
                            <p className={cn(
                                'text-sm font-semibold',
                                isCompleted ? 'text-primary' : 'text-muted-foreground'
                            )}>
                              Reward: ₹{item.reward}
                            </p>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-lg">Incentive Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted p-4">
                            <p className="text-sm text-muted-foreground">This Month</p>
                            <p className="text-2xl font-bold text-primary">₹3,245</p>
                        </div>
                         <div className="rounded-lg bg-muted p-4">
                            <p className="text-sm text-muted-foreground">Last Month</p>
                            <p className="text-2xl font-bold">₹2,890</p>
                        </div>
                    </div>
                     <p className="text-sm text-muted-foreground">
                        You're earning 12% more incentives than last month! 🎉
                    </p>
                </CardContent>
            </Card>

            <Card className="transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-border -mx-6 px-6">
                        {recentTransactions.map((transaction) => (
                             <div key={transaction.id} className="flex items-center justify-between py-3.5">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Order Completed</p>
                                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">+₹{transaction.amount}</p>
                                    <p className="text-xs text-muted-foreground">Credited</p>
                                 </div>
                             </div>
                        ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => router.push('/transactions')}>View All Transactions</Button>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <BottomNav />
    </div>
  );
}

export default function EarningsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="animate-pulse">
            <div className="h-32 bg-muted rounded-lg mb-4"></div>
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="space-y-4">
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
            </div>
          </div>
        </main>
      </div>
    }>
      <EarningsContent />
    </Suspense>
  );
}
