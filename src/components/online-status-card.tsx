
"use client"
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import GigSelectionDialog from './gig-selection-dialog';
import type { Gig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface OnlineStatusCardProps {
  isOnline: boolean;
  onGigsSelected: (gigs: Gig[]) => void;
  onGoOffline: () => void;
}

export default function OnlineStatusCard({ isOnline, onGigsSelected, onGoOffline }: OnlineStatusCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setIsDialogOpen(true);
    } else {
      onGoOffline();
    }
  };

  const handleGigSelection = (gigs: Gig[]) => {
    onGigsSelected(gigs);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className={cn("transition-all duration-300", isOnline && "border-green-200 bg-green-50/50")}>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-base">{isOnline ? 'You are Online' : 'You are Offline'}</p>
            <p className="text-sm text-muted-foreground">
              {isOnline 
                ? 'Accepting new orders'
                : 'Go online to start receiving orders'}
            </p>
          </div>
          <Switch
            checked={isOnline}
            onCheckedChange={handleSwitchChange}
            className="data-[state=checked]:bg-green-500"
          />
        </CardContent>
      </Card>
      <GigSelectionDialog 
        isOpen={isDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            // If the dialog is closed without selection, ensure the switch reflects the offline state.
            if (!isOnline) {
              setIsDialogOpen(false);
            }
          } else {
            setIsDialogOpen(true);
          }
        }}
        onGigsSelected={handleGigSelection}
      />
    </>
  );
}
