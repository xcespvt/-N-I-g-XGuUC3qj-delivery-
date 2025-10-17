
'use client';

import { useState } from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { deliveries } from '@/lib/data';
import type { Delivery } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

import { ArrowLeft, Clock, MapPin, MoreVertical, Navigation, Phone, Package, Building, User, CheckCircle, Headset, MessageSquare, Camera, Truck, Star, Info, Loader2 } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Link from 'next/link';

const ContactActionCard = ({ title, icon: Icon, name, address, distance, time, avatarUrl, avatarFallback, navigationUrl }: {
  title: string;
  icon: React.ElementType;
  name: string;
  address: string;
  distance: number;
  time: number;
  avatarUrl: string;
  avatarFallback: string;
  navigationUrl: string;
}) => {
    const handleAction = (action: 'Call') => {
        // This is a placeholder for the call/navigate functionality.
    }

    return (
        <Card>
            <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{title}</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
            <div className="mt-3 flex items-center gap-4">
                <Avatar className="h-12 w-12 border">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
                </Avatar>
                <div>
                <p className="font-bold">{name}</p>
                <p className="text-sm text-muted-foreground">{address}</p>
                </div>
            </div>
            <div className="mt-4 border-t pt-4 flex gap-4">
                <Button variant="outline" className="w-full" onClick={() => handleAction('Call')}>
                    <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
                <Link href={navigationUrl} className="w-full">
                  <Button className="w-full">
                      <Navigation className="mr-2 h-4 w-4" /> Navigate
                  </Button>
                </Link>
            </div>
            </CardContent>
        </Card>
    );
}

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const order = deliveries.find(d => d.id === params.id);
  
  const [currentStage, setCurrentStage] = useState<'Pickup' | 'AtRestaurant' | 'PickedUp' | 'AtCustomer' | 'Complete' | 'Cancelled'>(
    order?.status === 'Cancelled' ? 'Cancelled' : order?.stage || 'Pickup'
  );
  const [stageTimestamps, setStageTimestamps] = useState<{ [key: string]: string | null }>({});
  const [isPickupSheetOpen, setIsPickupSheetOpen] = useState(false);
  const [pickupPhoto, setPickupPhoto] = useState<File | null>(null);
  const [isDeliverySheetOpen, setIsDeliverySheetOpen] = useState(false);
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false);
  const [restaurantRating, setRestaurantRating] = useState(0);
  const [customerRating, setCustomerRating] = useState(0);
  const [restaurantComment, setRestaurantComment] = useState("");
  const [customerComment, setCustomerComment] = useState("");
  const [isSupportSheetOpen, setIsSupportSheetOpen] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isOrderCompleteScreenVisible, setIsOrderCompleteScreenVisible] = useState(false);

  if (!order) {
    notFound();
  }
  
  const handleConfirmPickup = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStageTimestamps(prev => ({ ...prev, PickedUp: now }));
    setCurrentStage('PickedUp');
    setIsPickupSheetOpen(false);
    setPickupPhoto(null);
  };

  const handleConfirmDelivery = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStageTimestamps(prev => ({ ...prev, Complete: now }));
    setCurrentStage('Complete');
    setIsDeliverySheetOpen(false);
    setIsFeedbackSheetOpen(true);
  };
  
  const handleFeedbackSubmit = () => {
    setIsFeedbackSheetOpen(false);
    setIsSubmittingFeedback(true);
    setTimeout(() => {
        setIsSubmittingFeedback(false);
        setIsOrderCompleteScreenVisible(true);
    }, 1500);
  };

  const handleCallSupport = () => {
    // Logic to call support
  };

  const handleChatSupport = () => {
      router.push('/profile/help-and-support/chat');
  };

  const actionButtonText: { [key in typeof currentStage]: string } = {
    Pickup: 'Arrived at Restaurant',
    AtRestaurant: 'Confirm Pickup',
    PickedUp: 'Arrived at Customer',
    AtCustomer: 'Confirm Delivery',
    Complete: 'Order Completed',
    Cancelled: 'Order Cancelled',
  };

  const handleNextStep = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    switch (currentStage) {
        case 'Pickup':
            setCurrentStage('AtRestaurant');
            setStageTimestamps(prev => ({ ...prev, AtRestaurant: now }));
            break;
        case 'AtRestaurant':
            setIsPickupSheetOpen(true);
            break;
        case 'PickedUp':
            setCurrentStage('AtCustomer');
            setStageTimestamps(prev => ({ ...prev, AtCustomer: now }));
            break;
        case 'AtCustomer':
            setIsDeliverySheetOpen(true);
            break;
        default:
            break;
    }
  };
  
  const timelineStages = [
    { key: 'AtRestaurant', label: 'Arrived at Restaurant' },
    { key: 'PickedUp', label: 'Order Picked Up' },
    { key: 'AtCustomer', label: 'Arrived at Customer Location' },
    { key: 'Complete', label: 'Order Delivered' },
  ];

  const stageMap: { [key in typeof currentStage]: number } = {
    'Pickup': -1,
    'AtRestaurant': 0,
    'PickedUp': 1,
    'AtCustomer': 2,
    'Complete': 3,
    'Cancelled': -1,
  };
  const currentStageIndex = stageMap[currentStage];
  
    if (isSubmittingFeedback) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Finalizing your earnings...</p>
        </div>
      </div>
    );
  }

  if (isOrderCompleteScreenVisible) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <CheckCircle className="h-24 w-24 text-green-500" />
        </motion.div>
        <h1 className="mt-6 text-2xl font-bold">Congratulations!</h1>
        {order && (
            <p className="mt-2 text-lg text-muted-foreground">
                You earned{' '}
                <span className="font-bold text-primary">₹{order.earnings.toFixed(2)}</span> on this order.
            </p>
        )}
        <Button size="lg" className="mt-8" onClick={() => router.push('/home')}>
          Back to Home
        </Button>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to Orders</span>
        </Button>
        <h1 className="text-lg font-semibold">Order #{order.id}</h1>
        <Sheet open={isSupportSheetOpen} onOpenChange={setIsSupportSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Headset className="h-5 w-5" />
              <span className="sr-only">Support</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                <Headset className="h-8 w-8 text-primary" />
            </div>
            <SheetHeader className="text-center">
              <SheetTitle>Contact Support</SheetTitle>
              <SheetDescription>
                How can we help you with this order?
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-3 my-4">
              <Button variant="outline" className="w-full justify-start h-12 text-base" onClick={handleCallSupport}>
                  <Phone className="mr-3 h-5 w-5" /> Call Agent
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 text-base" onClick={handleChatSupport}>
                  <MessageSquare className="mr-3 h-5 w-5" /> Chat with Agent
              </Button>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-1 space-y-4 p-4 pb-36">
        <Card>
            <div className="grid grid-cols-3 divide-x border-t">
              <div className="p-3 text-center">
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="font-bold">{order.distance} km</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-muted-foreground">Est. Time</p>
                <p className="font-bold">{order.estimatedTime} mins</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-muted-foreground">Earnings</p>
                <p className="font-bold text-primary">₹{order.earnings.toFixed(2)}</p>
              </div>
            </div>
        </Card>

        <ContactActionCard
          title="Pickup from"
          icon={Building}
          name={order.restaurant.name}
          address={order.restaurant.address}
          distance={order.restaurant.distance}
          time={order.restaurant.time}
          avatarUrl={order.restaurant.avatarUrl}
          avatarFallback={order.restaurant.name.charAt(0)}
          navigationUrl={`/orders/${order.id}/track`}
        />
        
        <ContactActionCard
          title="Deliver to"
          icon={User}
          name={order.customer.name}
          address={order.destination}
          distance={order.distance - order.restaurant.distance}
          time={order.estimatedTime - order.restaurant.time}
          avatarUrl={order.customer.avatarUrl}
          avatarFallback={order.customer.name.charAt(0)}
          navigationUrl={`/orders/${order.id}/track`}
        />

        {order.customer.instructions && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Customer Instructions
              </h3>
              <p className="text-muted-foreground mt-2">{order.customer.instructions}</p>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="order-items" className="border-b-0">
              <AccordionTrigger className="p-4 text-base font-semibold hover:no-underline">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Order Items ({order.orderItems.reduce((acc, item) => acc + item.quantity, 0)})
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2">
                  {order.orderItems.map(item => (
                    <div key={item.name} className="flex justify-between text-muted-foreground">
                      <span>{item.quantity} x {item.name}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card>
            <Accordion type="single" collapsible defaultValue="progress" className="w-full">
                <AccordionItem value="progress" className="border-b-0">
                    <AccordionTrigger className="p-4 text-base font-semibold hover:no-underline">
                        <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5 text-primary" />
                            Order Progress
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                        <div className="relative">
                            {timelineStages.map((s, index) => {
                                const isCompleted = currentStageIndex >= index;
                                const isLast = index === timelineStages.length - 1;
                                const timestamp = stageTimestamps[s.key as keyof typeof stageTimestamps];

                                return (
                                  <div key={s.key} className="relative flex">
                                    {!isLast && (
                                      <div className={cn(
                                        'absolute top-4 left-[15px] h-full w-0.5 -translate-x-1/2',
                                        isCompleted ? 'bg-primary' : 'bg-border'
                                      )} />
                                    )}
                                    <div className={cn(
                                        'flex h-8 w-8 items-center justify-center rounded-full z-10 mr-4',
                                        isCompleted ? 'bg-primary' : 'bg-background border-2'
                                    )}>
                                        {isCompleted ? <CheckCircle className="h-4 w-4 text-primary-foreground" /> : <div className="h-3 w-3 rounded-full bg-border" />}
                                    </div>
                                    <div className="pb-8 pt-1">
                                      <p className={cn(
                                          'font-semibold',
                                          isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                      )}>{s.label}</p>
                                      {timestamp && <p className="text-xs text-muted-foreground">{timestamp}</p>}
                                    </div>
                                  </div>
                                );
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
        
        <Card>
            <CardContent className="p-4">
                <h3 className="font-semibold text-base mb-3">Earnings Breakdown</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                        <span>Base Pay</span>
                        <span>₹{order.earningsBreakdown.basePay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Distance Pay ({order.distance} km)</span>
                        <span>₹{order.earningsBreakdown.distancePay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Order Value Commission (8%)</span>
                        <span>₹{order.earningsBreakdown.commission.toFixed(2)}</span>
                    </div>
                    {order.earningsBreakdown.membershipBonus && (
                        <div className="flex justify-between text-muted-foreground">
                            <span>Membership Bonus</span>
                            <span>₹{order.earningsBreakdown.membershipBonus.toFixed(2)}</span>
                        </div>
                    )}
                    {order.earningsBreakdown.petrolIncentive && (
                        <div className="flex justify-between text-muted-foreground">
                            <span>Petrol Incentive</span>
                            <span>₹{order.earningsBreakdown.petrolIncentive.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="border-t my-2"></div>
                    <div className="flex justify-between font-bold text-foreground">
                        <span>Total Earnings</span>
                        <span>₹{order.earningsBreakdown.total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
        
      </main>

      <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-background/90 p-4 backdrop-blur-sm sm:bottom-0">
          <Button
            size="lg"
            className="w-full"
            onClick={handleNextStep}
            disabled={currentStage === 'Complete' || currentStage === 'Cancelled'}
          >
            {actionButtonText[currentStage]}
          </Button>
      </div>

      <Sheet open={isPickupSheetOpen} onOpenChange={setIsPickupSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Confirm Pickup</SheetTitle>
            <SheetDescription>
              Please enter the OTP from the restaurant and upload a photo of the packed food to confirm pickup.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">Restaurant OTP</Label>
              <Input id="otp" placeholder="Enter 6-digit OTP" maxLength={6} type="tel" pattern="\d{6}" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order-photo">Photo of Packed Food</Label>
              <Label htmlFor="order-photo-input" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Camera className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> photo
                  </p>
                  {pickupPhoto && <p className="text-xs text-primary">{pickupPhoto.name}</p>}
                </div>
                <Input id="order-photo-input" type="file" className="hidden" accept="image/*" onChange={(e) => setPickupPhoto(e.target.files?.[0] || null)} />
              </Label>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleConfirmPickup}>Confirm & Proceed</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      <Sheet open={isDeliverySheetOpen} onOpenChange={setIsDeliverySheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Confirm Delivery</SheetTitle>
            <SheetDescription>
              Please enter the 6-digit OTP from the customer to confirm delivery.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customer-otp">Customer OTP</Label>
              <Input id="customer-otp" placeholder="Enter 6-digit OTP" maxLength={6} type="tel" pattern="\d{6}" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleConfirmDelivery}>Confirm Delivery</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      <Sheet open={isFeedbackSheetOpen} onOpenChange={setIsFeedbackSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Leave Feedback</SheetTitle>
            <SheetDescription>
              Your feedback helps us improve the experience for everyone.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Rate the Restaurant: {order.restaurant.name}</h4>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-7 w-7 cursor-pointer",
                      star <= restaurantRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                    )}
                    onClick={() => setRestaurantRating(star)}
                  />
                ))}
              </div>
              <Textarea 
                placeholder="Add a comment about the restaurant (optional)" 
                value={restaurantComment}
                onChange={(e) => setRestaurantComment(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Rate the Customer: {order.customer.name}</h4>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-7 w-7 cursor-pointer",
                      star <= customerRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                    )}
                    onClick={() => setCustomerRating(star)}
                  />
                ))}
              </div>
              <Textarea 
                placeholder="Add a comment about the customer (optional)"
                value={customerComment}
                onChange={(e) => setCustomerComment(e.target.value)}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" onClick={() => {
                setIsFeedbackSheetOpen(false);
                router.push('/');
              }}>Skip</Button>
            </SheetClose>
            <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

    </div>
  );
}
