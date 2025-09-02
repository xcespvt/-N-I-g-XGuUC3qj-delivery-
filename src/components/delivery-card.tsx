
// @/components/delivery-card.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { MapPin, Truck, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

import type { Delivery } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusConfig: { [key: string]: { icon: LucideIcon, label: string, badgeClass: string }} = {
  "In-progress": {
    icon: Truck,
    label: "In Progress",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
  },
  "Delivered": {
    icon: CheckCircle,
    label: "Delivered",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  "Cancelled": {
    icon: XCircle,
    label: "Cancelled",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
  },
};

const DeliveryCard = React.memo(({ delivery }: { delivery: Delivery }) => {
  const config = statusConfig[delivery.status];

  return (
    <Card className="transition-all duration-300">
      <div className="flex items-center justify-between bg-card p-4 border-b">
         <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border" data-ai-hint="person face">
                <AvatarImage src={delivery.customer.avatarUrl} alt={delivery.customer.name} />
                <AvatarFallback>{delivery.customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
             <div>
                <p className="font-bold">{delivery.customer.name}</p>
                <p className="text-sm text-muted-foreground">{delivery.id}</p>
             </div>
           </div>
        <Badge variant="outline" className={cn("border-0 font-medium", config.badgeClass)}>
            <config.icon className="h-4 w-4 mr-1.5" />
            {config.label}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-4">
        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{delivery.destination}</span>
        </p>
        <div className="border-t pt-4 space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Earnings</span>
                    <span className="font-bold">₹{delivery.earnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-bold">{delivery.distance.toFixed(1)} km</span>
                </div>
            </div>

            <Link href={`/orders/${delivery.id}`} passHref className="block pt-2">
              <Button className="w-full" size="lg">
                  {delivery.status === 'In-progress' ? (
                      <>
                          <Truck className="mr-2 h-4 w-4"/>
                          View Order
                      </>
                  ) : (
                      <>
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4"/>
                      </>
                  )}
              </Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
});

DeliveryCard.displayName = 'DeliveryCard';

export default DeliveryCard;
