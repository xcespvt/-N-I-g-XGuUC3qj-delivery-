
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Stethoscope, Heart, CalendarDays, MapPin, Clock4, Navigation, Plus, Trash2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { availableCheckups, pastCheckups, upcomingAppointment } from '@/lib/data';
import type { Checkup, PastCheckup } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const CheckupItem = ({ item }: { item: Checkup }) => (
    <div className="flex items-start gap-4 py-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <item.icon className="h-4 w-4 text-primary" />
        </div>
        <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
    </div>
);

const PastCheckupItem = ({ item }: { item: PastCheckup }) => (
    <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200">{item.status}</Badge>
    </div>
);

type FamilyMember = {
    id: number;
    name: string;
    relationship: string;
};


const BookingSheet = ({ onBook, children }: { onBook: () => void, children: React.ReactNode }) => {
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

    const addFamilyMember = () => {
        setFamilyMembers(prev => [...prev, { id: Date.now(), name: '', relationship: '' }]);
    };

    const removeFamilyMember = (id: number) => {
        setFamilyMembers(prev => prev.filter(member => member.id !== id));
    };

    const handleFamilyMemberChange = (id: number, field: 'name' | 'relationship', value: string) => {
        setFamilyMembers(prev => prev.map(member => 
            member.id === id ? { ...member, [field]: value } : member
        ));
    };


    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
                <SheetHeader>
                    <SheetTitle>Book Appointment</SheetTitle>
                    <SheetDescription>
                        Fill in the details below. Our team will call you to confirm the time slot.
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Rahul Singh" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue="rahul.singh@example.com" />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="font-medium">Family Members</h3>
                        {familyMembers.map((member, index) => (
                             <div key={member.id} className="space-y-3 rounded-lg border p-4 relative">
                                 <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-1 right-1 h-7 w-7"
                                    onClick={() => removeFamilyMember(member.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                                <div className="space-y-2">
                                    <Label htmlFor={`family-name-${member.id}`}>Family Member's Full Name</Label>
                                    <Input 
                                        id={`family-name-${member.id}`} 
                                        placeholder="Enter full name" 
                                        value={member.name}
                                        onChange={(e) => handleFamilyMemberChange(member.id, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`family-relationship-${member.id}`}>Relationship</Label>
                                    <Input 
                                        id={`family-relationship-${member.id}`} 
                                        placeholder="e.g., Spouse, Child, Parent"
                                        value={member.relationship}
                                        onChange={(e) => handleFamilyMemberChange(member.id, 'relationship', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                         <Button variant="outline" className="w-full" onClick={addFamilyMember}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Family Member
                        </Button>
                    </div>

                </div>
                <SheetFooter className="flex-col gap-2 pt-4 border-t">
                    <Button size="lg" onClick={onBook}>Submit</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default function MedicalCheckupPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleBookAppointment = () => {
        toast({
            title: "Appointment Booked!",
            description: "You will receive a confirmation call within 24 hours.",
        });
    };
    
    const handleNavigate = () => {
        toast({
            title: "Getting Directions",
            description: `Opening map to navigate to ${upcomingAppointment.centerName}.`,
        });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Icons.logo className="h-7 w-7 text-primary" />
                </div>
                <h1 className="text-lg font-semibold">Medical Check-up</h1>
                <div className="w-7" />
            </header>

            <main className="flex-1 space-y-6 p-4">
                 <Button variant="ghost" onClick={() => router.back()} className="mb-[-1rem] px-0 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Button>

                <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <Stethoscope className="h-6 w-6" />
                            <h2 className="text-xl font-bold">Free Health Check-ups</h2>
                        </div>
                        <p className="mt-1 text-sm text-primary-foreground/80">
                            Stay healthy while you deliver happiness
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                    </CardHeader>
                    {upcomingAppointment ? (
                        <CardContent className="pt-0">
                            <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
                                <div>
                                    <p className="font-bold text-base">{upcomingAppointment.centerName}</p>
                                    <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-start gap-2.5">
                                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            <span>{upcomingAppointment.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <CalendarDays className="h-4 w-4" />
                                            <span>{upcomingAppointment.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Clock4 className="h-4 w-4" />
                                            <span>{upcomingAppointment.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t pt-3">
                                    <h4 className="font-semibold text-sm mb-2">Check-ups included:</h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {upcomingAppointment.checkups.map(c => (
                                            <Badge key={c} variant="outline">{c}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" className="w-full">Cancel</Button>
                                <Button className="w-full" onClick={handleNavigate}>
                                    <Navigation className="mr-2 h-4 w-4" />
                                    Get Directions
                                </Button>
                            </div>
                            <Separator className="my-4" />
                             <BookingSheet onBook={handleBookAppointment}>
                                <Button variant="outline" className="w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Book New Appointment
                                </Button>
                            </BookingSheet>
                        </CardContent>
                    ) : (
                        <CardContent className="text-center text-muted-foreground py-10">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                <CalendarDays className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground text-lg">No Upcoming Appointments</h3>
                            <p className="mt-1 text-sm">Book a check-up to keep your health in top gear!</p>
                             <BookingSheet onBook={handleBookAppointment}>
                                <Button className="mt-4" size="lg">Book an Appointment</Button>
                            </BookingSheet>
                        </CardContent>
                    )}
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Available Check-ups:</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                         <div className="divide-y divide-border">
                            {availableCheckups.map((checkup) => (
                                <CheckupItem key={checkup.id} item={checkup} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Past Check-ups</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pt-0">
                        <div className="divide-y divide-border">
                            {pastCheckups.map((checkup) => (
                                <PastCheckupItem key={checkup.id} item={checkup} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-primary/90">"Your health is your wealth! Take a break from delivering and let us deliver some <span className="font-bold">health to you</span>."</p>
                    </CardContent>
                </Card>

            </main>
        </div>
    )
}
