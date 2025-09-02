'use client';

import { useState, useMemo } from 'react';
import { deliveries } from "@/lib/data";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DeliveryCard from '@/components/delivery-card';
import BottomNav from '@/components/bottom-nav';


export default function OrdersPage() {
  const [filter, setFilter] = useState<'active' | 'history'>('active');

  const filteredDeliveries = useMemo(() => {
    if (filter === 'active') {
      return deliveries.filter(d => d.status === 'In-progress');
    }
    return deliveries.filter(d => d.status !== 'In-progress');
  }, [filter]);

  return (
    <div className="flex min-h-screen w-full flex-col pb-20">
      <Header />
      <main className="flex flex-1 flex-col">
        <div className="p-4 bg-card border-b">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
            <Button 
                variant={filter === 'active' ? 'default' : 'ghost'} 
                onClick={() => setFilter('active')}
                className={cn("transition-all", filter === 'active' && 'bg-primary text-primary-foreground shadow-md')}>
                Active
            </Button>
            <Button 
                variant={filter === 'history' ? 'default' : 'ghost'}
                onClick={() => setFilter('history')}
                className={cn("transition-all", filter === 'history' && 'bg-primary text-primary-foreground shadow-md')}>
                History
            </Button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 bg-muted/40">
            {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map(delivery => (
                    <DeliveryCard key={delivery.id} delivery={delivery} />
                ))
            ) : (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">
                        {filter === 'active' 
                            ? "No active deliveries right now."
                            : "Your delivery history is empty."}
                    </p>
                </div>
            )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
