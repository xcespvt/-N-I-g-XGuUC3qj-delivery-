
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Info,
  MapPin,
  X,
  Bike,
  Flag,
  ChevronUp,
  ChevronRight,
  Clock,
  ChevronDown,
  Wallet,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { deliveries } from '@/lib/data';

export default function NewDeliveryCard() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeOrder = deliveries.find(d => d.status === 'In-progress');

  useEffect(() => {
    // Autoplay with muted is the most reliable way to handle browser policies
    if (audioRef.current) {
        audioRef.current.muted = true;
        audioRef.current.play().catch(error => {
            console.log("Audio autoplay prevented:", error);
        });
        // Unmute after a short delay
        setTimeout(() => {
             if (audioRef.current) {
                audioRef.current.muted = false;
             }
        }, 100);
    }
  }, []);

  const handleAccept = () => {
    toast({
        title: "Order Accepted!",
        description: "The order has been added to your active deliveries."
    });
    router.push('/orders');
    setIsVisible(false);
  };

  const handleDecline = () => {
    toast({
      title: 'Order Declined',
      description: 'The order has been passed to another partner.',
    });
    setIsVisible(false);
  };

  if (!isVisible || !activeOrder) {
    return null;
  }
  
  const distanceToCustomer = activeOrder.distance - activeOrder.restaurant.distance;

  return (
    <>
      <audio
        ref={audioRef}
        src="https://cdn.freesound.org/previews/198/198841_3723428-lq.mp3"
        preload="auto"
      />
      <div className="fixed inset-0 bg-black/50 z-[60] animate-in fade-in-50"></div>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[60] w-full bg-card rounded-t-3xl p-4 shadow-2xl animate-in slide-in-from-bottom-full duration-500'
        )}
      >
        
        <div className="text-center mb-4">
            <p className="text-xl font-bold">New order!</p>
        </div>

        <div className="space-y-3">
          {/* Earnings */}
          <div className="rounded-xl bg-primary/10 p-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                          <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                          <p className="text-sm text-muted-foreground">Earnings</p>
                          <p className="font-bold text-xl text-primary">₹{activeOrder.earnings.toFixed(2)}</p>
                      </div>
                  </div>
                   <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                          <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                          <p className="text-sm text-muted-foreground">Surge</p>
                          <p className="font-bold text-xl text-primary">₹36</p>
                      </div>
                  </div>
              </div>
          </div>
          
          {/* Distance */}
          <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Total trip distance</p>
                  <p className="font-bold text-lg">{activeOrder.distance.toFixed(1)} kms</p>
              </div>
              <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <Bike className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="w-0.5 h-8 bg-border my-1"></div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <Flag className="h-5 w-5 text-blue-600" />
                      </div>
                  </div>
                  <div className="space-y-6">
                      <div>
                          <p className="font-bold">Restaurant</p>
                          <p className="text-sm text-muted-foreground">{activeOrder.restaurant.distance.toFixed(1)} km</p>
                      </div>
                      <div>
                          <p className="font-bold">Customer</p>
                          <p className="text-sm text-muted-foreground">{distanceToCustomer.toFixed(1)} km</p>
                      </div>
                  </div>
              </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pickup-details" className="rounded-xl bg-muted/50 px-4">
              <AccordionTrigger className="py-4 font-semibold text-base hover:no-underline">Pickup Details</AccordionTrigger>
              <AccordionContent>
                <p className="font-bold">{activeOrder.restaurant.name}</p>
                <p className="text-sm text-muted-foreground">{activeOrder.restaurant.address}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
            <Button
              size="lg"
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full flex items-center justify-center overflow-hidden"
              onClick={handleAccept}
            >
              Accept order
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive"
              onClick={handleDecline}
            >
              Decline
            </Button>
        </div>
      </div>
    </>
  );
}
