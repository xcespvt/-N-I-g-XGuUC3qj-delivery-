
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Package } from "lucide-react";
import Link from 'next/link';
import { deliveries } from "@/lib/data";

export default function ActiveOrderCard() {
  const activeOrder = deliveries.find(d => d.status === 'In-progress');

  if (!activeOrder) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2 px-1">Active Order</h2>
            <Card className="transition-all duration-300">
                <CardContent className="p-4 text-center text-muted-foreground">
                    No active orders. Enjoy your break!
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div>
        <h2 className="text-lg font-semibold mb-2 px-1">Active Order</h2>
        <Card className="transition-all duration-300">
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
                            <Clock className="h-3 w-3 mr-1.5"/>
                            Pickup
                        </Badge>
                        <h3 className="font-semibold text-lg mt-2">{activeOrder.customer.name}'s Order</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="h-3.5 w-3.5"/> {activeOrder.distance} km away</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-primary">₹{activeOrder.earnings.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Earning</p>
                    </div>
                </div>
                <div className="border-t my-4"></div>
                <div className="flex justify-between items-center">
                     <p className="text-sm text-muted-foreground flex items-center gap-2"><Package className="h-4 w-4"/> 2 items</p>
                     <Link href={`/orders/${activeOrder.id}`}>
                        <Button>View Details</Button>
                     </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
