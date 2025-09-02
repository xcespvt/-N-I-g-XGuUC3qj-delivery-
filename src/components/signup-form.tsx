
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Check, CheckCircle, ChevronRight, FileUp, User, FileText, CalendarClock, Clock, Calendar, Briefcase, Camera, GraduationCap, Languages, Bike, Banknote, Shield, Zap, Gift, Heart, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { title: "Select your work type", subtext: "Please select how you want to work with Crevings" },
  { title: "Personal Info", subtext: "Please provide your personal details" },
  { title: "Emergency Contact", subtext: "Please provide your emergency contact's details" },
  { title: "Address Details", subtext: "Please provide your current address" },
  { title: "Education & Languages", subtext: "Tell us about your education and the languages you speak." },
  { title: "Vehicle Type", subtext: "Please select your primary vehicle for deliveries" },
  { title: "Vehicle Information", subtext: "Please provide your vehicle's details" },
  { title: "Bank Account", subtext: "Please provide your bank account details" },
  { title: "Legal Details", subtext: "Please provide your legal document details" },
  { title: "Upload Documents", subtext: "Please submit the below documents for verification" },
  { title: "Daily Subscription", subtext: ""},
  { title: "Application Submitted", subtext: "We'll notify you once your profile is approved." },
];

const jobTypes = [
  { id: 'full-time', title: 'Full Time', icon: Clock },
  { id: 'part-time', title: 'Part Time', icon: Briefcase },
];

const vehicleTypes = [
  { id: 'bike', title: 'Bike', icon: Bike },
  { id: 'cycle', title: 'Cycle', icon: Bike },
  { id: 'scooty', title: 'Scooty', icon: Bike },
  { id: 'ev-bike', title: 'EV Bike', icon: Bike },
  { id: 'ev-scooty', title: 'EV Scooty', icon: Bike },
];

const documents = [
    { id: 'profile', name: 'Profile Picture', description: 'Only Selfie', icon: User, status: 'Completed' as const, },
    { id: 'aadhaar', name: 'Aadhaar Card', description: 'Both Side', icon: FileText, status: 'Pending' as const, },
    { id: 'pan', name: 'PAN Card', description: 'Both Side', icon: FileText, status: 'Pending' as const, },
    { id: 'rc', name: 'Vehicle RC', description: 'Registration Certificate', icon: FileText, status: 'Pending' as const, },
    { id: 'cheque', name: 'Cancelled Cheque', description: 'For bank verification', icon: Banknote, status: 'Pending' as const, },
];

const benefits = {
    "Core Features": [
        "Extra petrol incentive on every order",
        "Exclusive member bonus on select orders",
    ],
    "Merchandise": [
        "FREE delivery bag, t-shirt, and raincoat",
        "70% discount on helmet and hoodies",
    ],
    "Health & Education": [
        "FREE weekly medical check-up for you & your family",
        "Special education incentives for your children",
        "60% reimbursement of medicine expense",
    ],
    "Insurance": [
        "₹5,00,000 Accidental Insurance"
    ]
};

const SubscriptionPlanCard = ({ onActivate }: { onActivate: () => void; }) => (
     <Card className="border-primary/30 transition-all duration-300 w-full text-left">
        <CardContent className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-primary">Daily Power Boost</h2>
                <p className="text-muted-foreground mt-1">Get a <span className="font-bold text-primary">2-month FREE</span> trial as a new partner!</p>
            </div>
            
            <div>
                <span className="text-4xl font-extrabold">₹20</span>
                <span className="text-muted-foreground">/day + GST</span>
                <p className="text-sm font-semibold text-green-600 mt-1">Total Savings of ₹3000</p>
            </div>
            
            <div className="space-y-4">
                {Object.entries(benefits).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="font-semibold mb-3">{category}</h3>
                        <ul className="space-y-2.5">
                            {items.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <Button size="lg" onClick={onActivate}>Activate Free Offer</Button>
            </div>
        </CardContent>
    </Card>
);

const RadioCard = ({ id, title, subtitle, icon: Icon, isSelected, onSelect }: { id: string; title: string; subtitle?: string; icon: any; isSelected: boolean; onSelect: (id: string) => void }) => (
    <Label htmlFor={id}>
        <Card className={cn(
            "p-4 transition-all cursor-pointer",
            isSelected ? "border-primary ring-2 ring-primary" : "border-border"
        )}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <RadioGroupItem value={id} id={id} checked={isSelected} className="h-5 w-5" />
                    <div>
                        <p className="font-semibold">{title}</p>
                        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                    </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
            </div>
        </Card>
    </Label>
);

const DocumentItem = ({ icon: Icon, name, description, status }: { icon: any; name: string; description: string; status: 'Completed' | 'Pending' }) => {
    const isCompleted = status === 'Completed';
    return (
        <Card className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-semibold", isCompleted ? "text-primary" : "text-yellow-600")}>
                        {status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>
        </Card>
    );
};

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedJobType, setSelectedJobType] = useState('full-time');
  const [selectedVehicleType, setSelectedVehicleType] = useState('bike');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
        router.push('/login');
        return;
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push('/login');
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    }
  };
  
  const stepInfo = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const isFinalStep = currentStep === steps.length - 1;

  if (isFinalStep) {
    return (
        <Card className="w-full max-w-md shadow-none border-0 bg-transparent">
            <CardContent className="p-6 flex flex-col min-h-[60vh] items-center justify-center text-center">
                <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
                <h1 className="text-2xl font-bold">{stepInfo.title}</h1>
                <p className="text-muted-foreground mt-2">{stepInfo.subtext}</p>
                <Button size="lg" className="w-full mt-8" onClick={() => router.push('/login')}>
                    Go to Login
                </Button>
            </CardContent>
        </Card>
    );
  }


  return (
    <Card className="w-full max-w-md shadow-none border-0 bg-transparent">
        <CardContent className="p-6 flex flex-col min-h-[60vh]">
            <header className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="w-full mx-8">
                    <Progress value={progressPercentage} />
                </div>
                <div className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                    {currentStep + 1} / {steps.length}
                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">{stepInfo.title}</h1>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                        {stepInfo.subtext}
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    {currentStep === 0 && (
                        <RadioGroup value={selectedJobType} onValueChange={setSelectedJobType} className="space-y-3">
                            {jobTypes.map(job => (
                                <RadioCard key={job.id} {...job} isSelected={selectedJobType === job.id} onSelect={setSelectedJobType} />
                            ))}
                        </RadioGroup>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-4 text-left">
                          <div>
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" placeholder="Enter your full name" />
                          </div>
                          <div>
                            <Label>Gender</Label>
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
                          </div>
                          <div>
                            <Label htmlFor="phone-number">Phone Number</Label>
                            <Input id="phone-number" type="tel" placeholder="Enter your phone number" />
                          </div>
                           <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                          </div>
                           <div>
                            <Label htmlFor="alt-phone-number">Alternate Phone Number <span className="text-muted-foreground">(Optional)</span></Label>
                            <Input id="alt-phone-number" type="tel" placeholder="Enter alternate number" />
                          </div>
                      </div>
                    )}
                    
                    {currentStep === 2 && (
                      <div className="space-y-4 text-left">
                          <div>
                            <Label htmlFor="contact-name">Contact Name</Label>
                            <Input id="contact-name" placeholder="Enter emergency contact's name" />
                          </div>
                          <div>
                            <Label htmlFor="relationship">Relationship</Label>
                            <Input id="relationship" placeholder="e.g., Spouse, Parent, Friend" />
                          </div>
                           <div>
                            <Label htmlFor="contact-number">Contact Number</Label>
                            <Input id="contact-number" type="tel" placeholder="Enter emergency contact's number" />
                          </div>
                      </div>
                    )}
                    
                    {currentStep === 3 && (
                        <div className="space-y-4 text-left">
                            <div>
                                <Label htmlFor="street-address">Street Address</Label>
                                <Textarea id="street-address" placeholder="Enter your full address" />
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="City" />
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input id="state" placeholder="State" />
                            </div>
                            <div>
                                <Label htmlFor="pin-code">PIN Code</Label>
                                <Input id="pin-code" placeholder="PIN Code" />
                            </div>
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" placeholder="Country" />
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-4 text-left">
                            <div>
                                <Label htmlFor="highest-education">Highest Education</Label>
                                <Select>
                                    <SelectTrigger id="highest-education">
                                        <SelectValue placeholder="Select education level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="high-school">High School</SelectItem>
                                        <SelectItem value="graduate">Graduate</SelectItem>
                                        <SelectItem value="post-graduate">Post Graduate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="languages-known">Languages Known</Label>
                                <Input id="languages-known" placeholder="e.g., English, Hindi, Kannada" />
                            </div>
                        </div>
                    )}

                    {currentStep === 5 && (
                        <RadioGroup value={selectedVehicleType} onValueChange={setSelectedVehicleType} className="space-y-3">
                            {vehicleTypes.map(vehicle => (
                                <RadioCard key={vehicle.id} {...vehicle} isSelected={selectedVehicleType === vehicle.id} onSelect={setSelectedVehicleType} />
                            ))}
                        </RadioGroup>
                    )}

                    {currentStep === 6 && (
                        <div className="space-y-4 text-left">
                            <div>
                                <Label htmlFor="brand">Brand</Label>
                                <Input id="brand" placeholder="e.g., Bajaj, Hero" />
                            </div>
                            <div>
                                <Label htmlFor="model">Model</Label>
                                <Input id="model" placeholder="e.g., Pulsar, Splendor" />
                            </div>
                            <div>
                                <Label htmlFor="vehicle-number">Vehicle Number</Label>
                                <Input id="vehicle-number" placeholder="e.g., KA-01-AB-1234" />
                            </div>
                        </div>
                    )}

                    {currentStep === 7 && (
                        <div className="space-y-4 text-left">
                            <div>
                                <Label htmlFor="bank-name">Bank Name</Label>
                                <Input id="bank-name" placeholder="Enter bank name" />
                            </div>
                            <div>
                                <Label htmlFor="account-holder-name">Account Holder Name</Label>
                                <Input id="account-holder-name" placeholder="Enter name as per bank records" />
                            </div>
                            <div>
                                <Label htmlFor="account-no">Account No</Label>
                                <Input id="account-no" placeholder="Enter account number" />
                            </div>
                            <div>
                                <Label htmlFor="ifsc-code">IFSC Code</Label>
                                <Input id="ifsc-code" placeholder="Enter IFSC code" />
                            </div>
                        </div>
                    )}

                    {currentStep === 8 && (
                        <div className="space-y-4 text-left">
                           <div>
                                <Label htmlFor="aadhaar-card">Aadhaar Card Number</Label>
                                <div className="relative">
                                    <Input id="aadhaar-card" placeholder="Enter 12-digit Aadhaar number" maxLength={12} />
                                    {!isOtpSent && (
                                        <Button variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8" onClick={() => setIsOtpSent(true)}>Send OTP</Button>
                                    )}
                                </div>
                            </div>
                            {isOtpSent && (
                                <div>
                                    <Label htmlFor="aadhaar-otp">Enter OTP</Label>
                                    <Input id="aadhaar-otp" placeholder="Enter 6-digit OTP" maxLength={6} />
                                </div>
                            )}
                            <div>
                                <Label htmlFor="pan-card">PAN Card Number</Label>
                                <Input id="pan-card" placeholder="Enter PAN number" />
                            </div>
                        </div>
                    )}
                    
                    {currentStep === 9 && (
                        <div className="space-y-3">
                            {documents.map(doc => (
                                <DocumentItem key={doc.id} {...doc} />
                            ))}
                        </div>
                    )}

                    {currentStep === 10 && (
                        <div className="flex justify-center">
                            <SubscriptionPlanCard onActivate={handleNext} />
                        </div>
                    )}
                </div>
            </main>
            
            {currentStep < 10 && (
                 <footer className="mt-8">
                    <Button size="lg" className="w-full h-12" onClick={handleNext}>
                        {currentStep === 9 ? 'Submit Documents' : 'Continue'}
                    </Button>
                </footer>
            )}
        </CardContent>
    </Card>
  );
}

    

    

    