
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, TrafficCone, Phone, MessageSquare, Building, User, GripHorizontal, Info, CheckCircle, Package, Camera, Star, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deliveries } from '@/lib/data';
import { notFound } from 'next/navigation';
import GoogleMapsTracker from '@/components/google-maps-tracker';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


export default function TrackOrderPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const order = deliveries.find(d => d.id === params.id);

    const [currentStage, setCurrentStage] = useState<'Pickup' | 'AtRestaurant' | 'PickedUp' | 'AtCustomer' | 'Complete' | 'Cancelled'>(
        order?.status === 'Cancelled' ? 'Cancelled' : order?.stage || 'Pickup'
    );
    const [isPickupSheetOpen, setIsPickupSheetOpen] = useState(false);
    const [pickupPhoto, setPickupPhoto] = useState<File | null>(null);
    const [isDeliverySheetOpen, setIsDeliverySheetOpen] = useState(false);
    const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false);
    const [restaurantRating, setRestaurantRating] = useState(0);
    const [customerRating, setCustomerRating] = useState(0);
    const [restaurantComment, setRestaurantComment] = useState("");
    const [customerComment, setCustomerComment] = useState("");

    if (!order) {
        notFound();
    }

    const actionButtonText: { [key in typeof currentStage]: string } = {
        Pickup: 'Arrived at Restaurant',
        AtRestaurant: 'Confirm Pickup',
        PickedUp: 'Arrived at Customer',
        AtCustomer: 'Confirm Delivery',
        Complete: 'Order Completed',
        Cancelled: 'Order Cancelled',
    };

    const handleNextStep = () => {
        switch (currentStage) {
            case 'Pickup':
                setCurrentStage('AtRestaurant');
                break;
            case 'AtRestaurant':
                setIsPickupSheetOpen(true);
                break;
            case 'PickedUp':
                setCurrentStage('AtCustomer');
                break;
            case 'AtCustomer':
                setIsDeliverySheetOpen(true);
                break;
            default:
                break;
        }
    };

    const handleConfirmPickup = () => {
        setCurrentStage('PickedUp');
        setIsPickupSheetOpen(false);
        setPickupPhoto(null);
    };

    const handleConfirmDelivery = () => {
        setCurrentStage('Complete');
        setIsDeliverySheetOpen(false);
        setIsFeedbackSheetOpen(true);
    };
    
    const handleFeedbackSubmit = () => {
        setIsFeedbackSheetOpen(false);
        router.push('/');
    };

    return (
        <div className="flex h-screen w-full flex-col bg-background">
            <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <div className="text-center">
                    <h1 className="text-lg font-semibold">12 mins remaining</h1>
                    <p className="text-xs text-muted-foreground">4.2 km</p>
                </div>
                <div className="w-8" />
            </header>
            
            <main className="flex-1 relative">
                <div className="absolute inset-0">
                    {order.restaurant.coordinates && order.customerLocation?.coordinates ? (
                        <GoogleMapsTracker
                            restaurantLocation={{
                                lat: order.restaurant.coordinates.lat,
                                lng: order.restaurant.coordinates.lng,
                                name: order.restaurant.name,
                                address: order.restaurant.address
                            }}
                            customerLocation={{
                                lat: order.customerLocation.coordinates.lat,
                                lng: order.customerLocation.coordinates.lng,
                                name: order.customer.name,
                                address: order.customerLocation.address
                            }}
                            stage={currentStage}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-muted">
                            <p className="text-muted-foreground">Map data not available</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="sticky bottom-0 z-10 w-full bg-card rounded-t-3xl p-4 shadow-2xl-top space-y-4">
                <div className="relative">
                    <div className="w-full pr-12">
                        <p className="text-sm text-muted-foreground">Next turn in 200m</p>
                        <p className="font-bold text-2xl text-primary">Turn left onto 80ft Road</p>
                    </div>
                    <Sheet>
                         <SheetTrigger asChild>
                             <Button variant="outline" size="icon" className="rounded-full absolute -top-1 right-0 h-10 w-10">
                                <Info className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-3xl p-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Building className="h-6 w-6 text-green-500" />
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">Pickup Location</p>
                                        <h3 className="font-bold">{order.restaurant.name}</h3>
                                    </div>
                                    <Button size="icon" variant="outline" className="h-12 w-12 rounded-full">
                                        <Phone className="h-5 w-5" />
                                    </Button>
                                </div>
                                
                                <Separator />

                                <div className="flex items-center gap-4">
                                    <User className="h-6 w-6 text-green-500" />
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">Customer</p>
                                        <h3 className="font-bold">{order.customer.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="outline" className="h-12 w-12 rounded-full">
                                            <Phone className="h-5 w-5" />
                                        </Button>
                                        <Button size="icon" variant="outline" className="h-12 w-12 rounded-full">
                                            <MessageSquare className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                {order.customer.instructions && (
                                <>
                                    <Separator />
                                    <Card className="bg-muted/50 border-0">
                                        <CardContent className="p-4">
                                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                                            <Info className="h-5 w-5 text-primary" />
                                            Customer Instructions
                                        </h3>
                                        <p className="text-muted-foreground text-sm">{order.customer.instructions}</p>
                                        </CardContent>
                                    </Card>
                                </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <Button
                    size="lg"
                    className="w-full"
                    onClick={handleNextStep}
                    disabled={currentStage === 'Complete' || currentStage === 'Cancelled'}
                >
                    {actionButtonText[currentStage]}
                </Button>
            </footer>
           
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
                        <Button variant="outline" onClick={() => setIsPickupSheetOpen(false)}>Cancel</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button onClick={handleConfirmPickup}>Confirm & Proceed</Button>
                    </SheetClose>
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
                        <Button variant="outline" onClick={() => setIsDeliverySheetOpen(false)}>Cancel</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button onClick={handleConfirmDelivery}>Confirm Delivery</Button>
                    </SheetClose>
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
                    <SheetClose asChild>
                         <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                    </SheetClose>
                </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
    
    

  

    

    

    