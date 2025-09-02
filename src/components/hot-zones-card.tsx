
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Flame, Building2 } from "lucide-react";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { hotZones } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function HotZonesCard() {
  const { toast } = useToast();

  const handleGoToHotZone = () => {
    toast({
      title: "Navigating to Hot Zone",
      description: `Opening map to direct you to ${hotZones[0].name}.`,
    });
  };

  return (
    <Card className="transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Flame className="text-accent" />
            Hot Zones
        </CardTitle>
        <Badge variant="outline" className={cn("border-accent text-accent bg-accent/10 h-6")}>High Demand</Badge>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Tabs defaultValue="list">
            <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="m-0">
                <div className="aspect-[4/3] w-full rounded-md bg-muted overflow-hidden relative">
                    <Image src="https://placehold.co/400x300.png" alt="Map of hot zones" layout="fill" objectFit="cover" data-ai-hint="city map" />
                    <div className="absolute top-[30%] left-[60%]"><div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">12</div></div>
                    <div className="absolute top-[50%] left-[45%]"><div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">3</div></div>
                    <div className="absolute top-[40%] left-[75%]"><div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">8</div></div>
                    <div className="absolute top-[65%] left-[30%]"><div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">10</div></div>
                </div>
            </TabsContent>
            <TabsContent value="list" className="m-0">
                 <div className="space-y-3">
                    {hotZones.map((zone, index) => (
                        <div key={zone.name} className={cn("flex justify-between items-center p-3 rounded-lg bg-secondary/30 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:bg-secondary/50", index !== hotZones.length - 1 && "pb-3 border-b")}>
                            <div>
                                <p className="font-medium">{zone.name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3"/> {zone.distance} km</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-accent">{zone.orders} orders</p>
                                <p className="text-xs text-muted-foreground">{zone.earning}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
        <Button className="w-full mt-4" onClick={handleGoToHotZone}><Building2 className="mr-2 h-4 w-4"/> Go to Nearest Hot Zone</Button>
      </CardContent>
    </Card>
  )
}
