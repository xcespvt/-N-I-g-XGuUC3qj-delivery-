
'use client';

import { useState, useEffect } from 'react';
import type { Gig } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Header from "@/components/header";
import OnlineStatusCard from "@/components/online-status-card";
import WeatherReportCard from "@/components/weather-report-card";
import HotZonesCard from "@/components/hot-zones-card";
import TodaysStats from "@/components/todays-stats";
import ActiveOrderCard from "@/components/active-order-card";
import NearbyHubsCard from "@/components/nearby-hubs-card";
import WeekendBonusCard from "@/components/weekend-bonus-card";
import SosButton from "@/components/sos-button";
import BottomNav from "@/components/bottom-nav";
import { Heart } from "lucide-react";
import NewDeliveryCard from '@/components/new-delivery-card';

export default function HomePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeGigs, setActiveGigs] = useState<Gig[]>([]);
  const [showNewDelivery, setShowNewDelivery] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOnline) {
      // Show the new delivery card a few seconds after going online
      timer = setTimeout(() => {
        setShowNewDelivery(true);
      }, 3000);
    } else {
      setShowNewDelivery(false);
    }
    return () => clearTimeout(timer);
  }, [isOnline]);

  const handleGoOffline = () => {
    setIsOnline(false);
    setActiveGigs([]);
    setShowNewDelivery(false);
    toast({
      title: "You're Offline",
      description: "You will no longer receive order notifications.",
    });
  };

  const handleGigsSelected = (gigs: Gig[]) => {
    setActiveGigs(gigs);
    setIsOnline(true);
    toast({
        title: "You're Online!",
        description: `You've selected ${gigs.length} shift(s). Good luck!`,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col pb-16">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4">
        <OnlineStatusCard 
            isOnline={isOnline}
            onGigsSelected={handleGigsSelected}
            onGoOffline={handleGoOffline}
        />
        <WeatherReportCard />
        {showNewDelivery && <NewDeliveryCard />}
        <TodaysStats />
        <ActiveOrderCard />
        <HotZonesCard />
        <NearbyHubsCard />
        <WeekendBonusCard />
        <div className="py-6 text-center text-muted-foreground">
          <h2 className="text-xl font-bold tracking-tight text-foreground">We value you</h2>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-sm">
            Crafted with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> for India by Indians
          </p>
        </div>
      </main>
      <SosButton />
      <BottomNav />
    </div>
  );
}
