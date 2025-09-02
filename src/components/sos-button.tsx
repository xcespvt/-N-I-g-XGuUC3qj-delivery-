
'use client';

import { AlertTriangle, Phone, Shield, HeartPulse, Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';

export default function SosButton() {
  const { toast } = useToast();

  const handleSosAction = (action: string) => {
    toast({
      title: "Emergency Action Taken",
      description: `${action}. Your location has been shared. Help is on the way.`,
      variant: "destructive",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="destructive"
          className="fixed bottom-20 right-4 h-16 w-16 rounded-full shadow-2xl z-50 flex flex-col items-center justify-center gap-1"
        >
          <AlertTriangle className="h-7 w-7" />
          <span className="text-xs font-bold">SOS</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-2">
                <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <SheetTitle>Emergency Actions</SheetTitle>
            <SheetDescription>
                Only use this in a genuine emergency. Your location will be shared with the selected service.
            </SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 my-4">
            <SheetClose asChild>
                <Button variant="outline" className="w-full justify-start h-12 text-base border-blue-500/50 text-blue-600 hover:bg-blue-50 hover:text-blue-700" onClick={() => handleSosAction('Contacting Police')}>
                    <Shield className="mr-3 h-5 w-5" /> Call Police
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="outline" className="w-full justify-start h-12 text-base border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleSosAction('Contacting Ambulance')}>
                    <HeartPulse className="mr-3 h-5 w-5" /> Call Ambulance
                </Button>
            </SheetClose>
             <SheetClose asChild>
                <Button variant="outline" className="w-full justify-start h-12 text-base border-green-500/50 text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleSosAction('Contacting Partner Care')}>
                    <Headset className="mr-3 h-5 w-5" /> Call Partner Care
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="outline" className="w-full justify-start h-12 text-base border-gray-500/50 text-gray-600 hover:bg-gray-100 hover:text-gray-700" onClick={() => handleSosAction('Contacting Emergency Contact')}>
                    <Phone className="mr-3 h-5 w-5" /> Call Emergency Contact
                </Button>
            </SheetClose>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="default">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
