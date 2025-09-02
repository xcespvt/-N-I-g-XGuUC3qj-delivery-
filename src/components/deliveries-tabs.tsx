"use client";

import { cn } from "@/lib/utils";
import type { Delivery } from "@/lib/types";
import { format } from "date-fns";
import {
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  MapPin,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DeliveriesTabsProps {
  deliveries: Delivery[];
}

const statusConfig = {
    "In-progress": { icon: Car, color: "text-blue-500", bg: "bg-blue-100" },
    Delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" },
    Cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
};

export default function DeliveriesTabs({ deliveries }: DeliveriesTabsProps) {
  const activeDeliveries = deliveries.filter((d) => d.status === "In-progress");
  const deliveryHistory = deliveries.filter((d) => d.status !== "In-progress");

  return (
    <Tabs defaultValue="active">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">Active Deliveries</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card>
          <CardHeader>
            <CardTitle>Active Deliveries</CardTitle>
            <CardDescription>
              Manage your ongoing deliveries.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeDeliveries.length > 0 ? (
                activeDeliveries.map(delivery => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-secondary/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Avatar data-ai-hint="person face">
                                <AvatarImage src={delivery.customer.avatarUrl} alt={delivery.customer.name} />
                                <AvatarFallback>{delivery.customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{delivery.id} - {delivery.customer.name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4"/>{delivery.destination}</p>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                            <div>
                                <p className="font-bold text-lg text-primary">₹{delivery.earnings.toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">{delivery.distance} mi</p>
                            </div>
                            <Button size="icon" variant="ghost">
                                <ChevronRight className="w-5 h-5"/>
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>No active deliveries right now.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Delivery History</CardTitle>
            <CardDescription>
              Review your past deliveries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryHistory.map((delivery) => {
                    const statusInfo = statusConfig[delivery.status as keyof typeof statusConfig] || { icon: Clock, color: "text-gray-500", bg: "bg-gray-100" };
                    return (
                        <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{delivery.customer.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{delivery.destination}</TableCell>
                            <TableCell>₹{delivery.earnings.toFixed(2)}</TableCell>
                            <TableCell>{format(new Date(delivery.timestamp), "MMM d, yyyy")}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant="outline" className={cn("border-0", statusInfo.bg, statusInfo.color)}>
                                    <statusInfo.icon className="mr-2 h-4 w-4" />
                                    {delivery.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
