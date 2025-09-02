
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { gigs } from '@/lib/data';
import type { Gig } from '@/lib/types';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface GigSelectionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGigsSelected: (gigs: Gig[]) => void;
}

const GigCard = ({ gig, isSelected, onSelect }: { gig: Gig; isSelected: boolean, onSelect: () => void }) => {
  return (
    <Label htmlFor={gig.id} className="block cursor-pointer">
        <div 
            className={cn(
                "rounded-2xl border bg-card p-4 shadow-sm transition-all duration-300",
                isSelected ? "border-primary ring-2 ring-primary" : "border-border"
            )}
        >
            <div className="flex items-center gap-4">
                <Checkbox id={gig.id} checked={isSelected} onCheckedChange={onSelect} className="h-5 w-5" />
                <div className="flex-1 grid grid-cols-2 items-center">
                    <div>
                        <p className="font-semibold">{gig.time}</p>
                    </div>
                </div>
            </div>
        </div>
    </Label>
  )
};


export default function GigSelectionDialog({ isOpen, onOpenChange, onGigsSelected }: GigSelectionDialogProps) {
  const [selectedGigIds, setSelectedGigIds] = useState<string[]>([gigs[0].id]);

  const handleToggleGig = (gigId: string) => {
    setSelectedGigIds(prev => 
        prev.includes(gigId) ? prev.filter(id => id !== gigId) : [...prev, gigId]
    );
  };

  const handleContinue = () => {
    const selectedGigs = gigs.filter(g => selectedGigIds.includes(g.id));
    if (selectedGigs.length > 0) {
        onGigsSelected(selectedGigs);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] flex flex-col">
        <SheetHeader className="text-center">
            <SheetTitle className="text-2xl font-bold">Select Shift</SheetTitle>
            <SheetDescription>
                Please select your shift timings to deliver order.
            </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4 flex-1 overflow-y-auto">
            {gigs.map(gig => (
                <GigCard 
                    key={gig.id} 
                    gig={gig} 
                    isSelected={selectedGigIds.includes(gig.id)}
                    onSelect={() => handleToggleGig(gig.id)}
                />
            ))}
        </div>
        <SheetFooter>
            <Button size="lg" className="w-full" onClick={handleContinue} disabled={selectedGigIds.length === 0}>
                Continue
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
