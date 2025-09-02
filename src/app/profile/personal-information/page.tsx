
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            {children}
        </CardContent>
    </Card>
);

const FormField = ({ label, children, optional = false }: { label: string, children: React.ReactNode, optional?: boolean }) => (
    <div className="grid gap-2">
        <div className="flex items-center justify-between">
            <Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
            {optional && <span className="text-xs text-muted-foreground">Optional</span>}
        </div>
        {children}
    </div>
);


export default function PersonalInformationPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [vehicleType, setVehicleType] = useState('bike');

    const handleSaveChanges = () => {
        toast({
            title: "Changes Saved!",
            description: "Your personal information has been updated successfully.",
        });
        router.back();
    };
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-lg font-semibold">Personal Information</h1>
                </div>
                <div className="relative">
                    <Link href="/notifications">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-white pointer-events-none">3</span>
                    </Link>
                </div>
            </header>

            <main className="flex-1 space-y-6 p-4 pb-28">
                <FormSection title="Basic Information">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="First Name">
                            <Input id="first-name" defaultValue="Rahul" />
                        </FormField>
                        <FormField label="Last Name">
                            <Input id="last-name" defaultValue="Singh" />
                        </FormField>
                    </div>
                    <FormField label="Gender">
                         <RadioGroup defaultValue="male" className="flex items-center gap-6 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
                            </div>
                        </RadioGroup>
                    </FormField>
                     <FormField label="Date of Birth">
                        <Select>
                             <SelectTrigger id="date-of-birth" className="w-[180px]">
                                <SelectValue placeholder="05/15/1990" />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="1990-05-15">05/15/1990</SelectItem>
                             </SelectContent>
                        </Select>
                     </FormField>
                </FormSection>

                <FormSection title="Contact Information">
                    <FormField label="Email Address">
                        <Input id="email-address" defaultValue="rahul.singh@example.com" disabled />
                    </FormField>
                     <FormField label="Phone Number">
                        <Input id="phone-number" defaultValue="+91 98765 43210" disabled />
                    </FormField>
                     <FormField label="Alternate Phone Number" optional>
                        <Input id="alternate-phone-number" placeholder="Enter alternate phone number" />
                    </FormField>
                </FormSection>

                <FormSection title="Address Information">
                    <FormField label="Street Address">
                        <Textarea id="street-address" defaultValue="123 Main Street, Apartment 4B" />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="City">
                            <Input id="city" defaultValue="Bangalore" />
                        </FormField>
                        <FormField label="State">
                            <Input id="state" defaultValue="Karnataka" />
                        </FormField>
                        <FormField label="PIN Code">
                            <Input id="pin-code" defaultValue="560001" />
                        </FormField>
                         <FormField label="Country">
                            <Input id="country" defaultValue="India" />
                        </FormField>
                    </div>
                </FormSection>
                
                <FormSection title="Vehicle Information">
                    <FormField label="Vehicle Type">
                         <RadioGroup value={vehicleType} onValueChange={setVehicleType} className="flex items-center gap-6 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bike" id="bike" />
                                <Label htmlFor="bike" className="font-normal cursor-pointer">Bike</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="scooty" id="scooty" />
                                <Label htmlFor="scooty" className="font-normal cursor-pointer">Scooty</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bicycle" id="bicycle" />
                                <Label htmlFor="bicycle" className="font-normal cursor-pointer">Bicycle</Label>
                            </div>
                        </RadioGroup>
                    </FormField>
                    {(vehicleType === 'bike' || vehicleType === 'scooty') && (
                        <>
                            <FormField label="Driving Licence Number">
                                <Input id="licence-number" placeholder="Enter DL number" />
                            </FormField>
                            <FormField label="Vehicle Model">
                                <Input id="vehicle-model" placeholder="e.g., Bajaj Pulsar" />
                            </FormField>
                        </>
                    )}
                </FormSection>

                <FormSection title="Additional Information">
                    <FormField label="Education">
                        <Select defaultValue="graduate">
                            <SelectTrigger id="education">
                                <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high-school">High School</SelectItem>
                                <SelectItem value="graduate">Graduate</SelectItem>
                                <SelectItem value="post-graduate">Post Graduate</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormField>
                    <FormField label="Languages Known">
                        <Input id="languages-known" defaultValue="English, Hindi, Kannada" />
                    </FormField>
                    <div className="flex items-center justify-between rounded-lg border p-3.5">
                        <div>
                            <p className="font-medium text-sm">Receive updates on WhatsApp</p>
                            <p className="text-xs text-muted-foreground">Get delivery updates and important notifications</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-3.5">
                        <div>
                            <p className="font-medium text-sm">Receive SMS notifications</p>
                            <p className="text-xs text-muted-foreground">Get delivery updates and important notifications</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </FormSection>

                <FormSection title="Emergency Contact">
                    <FormField label="Contact Name">
                        <Input id="contact-name" defaultValue="Priya Singh" />
                    </FormField>
                    <FormField label="Relationship">
                        <Input id="relationship" defaultValue="Spouse" />
                    </FormField>
                    <FormField label="Contact Number">
                        <Input id="contact-number" defaultValue="+91 87654 32109" />
                    </FormField>
                </FormSection>

            </main>

            <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/90 p-4 backdrop-blur-sm sm:static sm:bg-transparent sm:p-0">
                <Button size="lg" className="w-full" onClick={handleSaveChanges}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
