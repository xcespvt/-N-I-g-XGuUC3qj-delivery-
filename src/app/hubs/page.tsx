
'use client';

import { useState, useMemo } from 'react';
import Header from "@/components/header";
import { hubs } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import BottomNav from '@/components/bottom-nav';

const HubFacilityBadge = ({ icon: Icon, label }: { icon: LucideIcon, label: string }) => (
    <Badge variant="outline" className="font-normal border-gray-300 bg-muted/50 py-1 px-2.5">
        <Icon className="h-4 w-4 mr-1.5 text-primary" />
        <span className="text-sm">{label}</span>
    </Badge>
);

export default function HubsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHubs = useMemo(() => {
    if (!searchTerm) {
      return hubs;
    }
    return hubs.filter(hub =>
      hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const handleNavigate = (hubName: string) => {
    toast({
      title: "Navigation Started",
      description: `Opening map to navigate to ${hubName}.`,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
      <main className="flex flex-1 flex-col gap-4 p-4">
        <Card className="overflow-hidden transition-all duration-300">
            <div className="relative h-48 w-full">
                 <Image 
                    src="https://picsum.photos/seed/city-map/600/400"
                    alt="Map of hubs"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="city map"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-white">Hubs Near You</h2>
                 </div>
            </div>
        </Card>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search for hubs by name or address..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
            {filteredHubs.length > 0 ? (
                filteredHubs.map((hub) => (
                    <Card key={hub.id} className="transition-all duration-300">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-primary">{hub.name}</h3>
                                    <p className="text-sm font-semibold text-muted-foreground">{hub.distance.toFixed(1)} km away</p>
                                </div>
                                <Button size="sm" onClick={() => handleNavigate(hub.name)}>
                                    <Navigation className="mr-2 h-4 w-4" />
                                    Navigate
                                </Button>
                            </div>
                            <div className="mt-3 border-t pt-3 space-y-2 text-sm text-muted-foreground">
                                 <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{hub.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>Operating Hours: {hub.operatingHours}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-semibold text-sm mb-2">Facilities</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {hub.facilities.map(facility => (
                                        <HubFacilityBadge key={facility.name} icon={facility.icon} label={facility.name} />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card className="text-center py-10 transition-all duration-300">
                    <CardContent>
                        <p className="text-muted-foreground">No hubs found for "{searchTerm}".</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
