
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Package,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { merchandiseOrders } from '@/lib/data';
import type { MerchandiseOrder, MerchandiseOrderStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

const StatCard = ({ icon: Icon, value, label }: { icon: LucideIcon, value: number, label: string }) => (
  <Card className="transition-transform hover:scale-105">
    <CardContent className="p-3 flex flex-col items-center justify-center space-y-1 h-24">
      <Icon className="h-6 w-6 text-primary mb-1" />
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

const statusConfig: Record<MerchandiseOrderStatus, { badgeClass: string }> = {
  'In Transit': { badgeClass: 'bg-blue-100 text-primary border-transparent font-medium' },
  Processing: { badgeClass: 'bg-yellow-100 text-yellow-800 border-transparent font-medium' },
  Delivered: { badgeClass: 'bg-green-100 text-green-700 border-transparent font-medium' },
  Cancelled: { badgeClass: 'bg-red-100 text-red-700 border-transparent font-medium' },
};

const OrderCard = ({ order }: { order: MerchandiseOrder }) => {
  const config = statusConfig[order.status];
  const { toast } = useToast();
  
  const handleCardClick = () => {
    toast({
        title: "Tracking Order",
        description: `Showing details for order #${order.orderId}.`,
    });
  };
  
  return (
    <Card onClick={handleCardClick} className="cursor-pointer transition-all duration-300">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <Image
              src={order.imageUrl}
              alt={order.productName}
              layout="fill"
              objectFit="cover"
              data-ai-hint={order.imageHint}
            />
          </div>
          <div>
            <h3 className="font-bold">{order.productName}</h3>
            <p className="text-xs text-muted-foreground">Order #{order.orderId}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Badge className={config.badgeClass}>{order.status}</Badge>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
};


export default function TrackOrdersPage() {
  const router = useRouter();

  const [filter, setFilter] = useState('current');
  
  const currentOrders = merchandiseOrders.filter(o => o.status === 'In Transit' || o.status === 'Processing');
  const pastOrders = merchandiseOrders.filter(o => o.status === 'Delivered' || o.status === 'Cancelled');

  const stats = {
      total: merchandiseOrders.length,
      inProgress: currentOrders.length,
      delivered: pastOrders.filter(o => o.status === 'Delivered').length
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <Icons.logo className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-lg font-semibold">My Orders</h1>
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
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={ShoppingBag} value={stats.total} label="Total Orders" />
          <StatCard icon={Truck} value={stats.inProgress} label="In Progress" />
          <StatCard icon={Package} value={stats.delivered} label="Delivered" />
        </div>

        <div>
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Orders</TabsTrigger>
              <TabsTrigger value="past">Past Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-4 space-y-4">
              {currentOrders.length > 0 ? (
                  currentOrders.map(order => <OrderCard key={order.id} order={order} />)
              ) : (
                  <p className="text-center text-muted-foreground py-10">No current orders.</p>
              )}
            </TabsContent>
            <TabsContent value="past" className="mt-4 space-y-4">
              {pastOrders.length > 0 ? (
                  pastOrders.map(order => <OrderCard key={order.id} order={order} />)
              ) : (
                  <p className="text-center text-muted-foreground py-10">No past orders.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Link href="/profile/merchandise" passHref>
            <Button className="w-full" size="lg">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Visit Crevings Store
            </Button>
        </Link>

      </main>
    </div>
  );
}
