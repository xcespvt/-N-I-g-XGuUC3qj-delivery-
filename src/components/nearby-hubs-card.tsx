
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { MapPin, ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import { hubs } from '@/lib/data';
import type { LucideIcon } from "lucide-react";

const HubBadge = ({ icon: Icon, label }: { icon: LucideIcon, label: string }) => (
    <Badge variant="outline" className="font-normal border-gray-300">
        <Icon className="h-3.5 w-3.5 mr-1.5" />
        {label}
    </Badge>
);

export default function NearbyHubsCard() {
  const nearestHub = hubs[0];

  return (
    <div>
        <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-lg font-semibold">Nearby Hubs</h2>
            <Link href="/hubs" className="text-sm text-primary font-medium flex items-center">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
        </div>
        <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <Icons.logo className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{nearestHub.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="h-3.5 w-3.5"/> {nearestHub.distance} km away</p>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                    {nearestHub.facilities.map(facility => (
                       <HubBadge key={facility.name} icon={facility.icon} label={facility.name} />
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
