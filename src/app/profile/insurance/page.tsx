
'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Shield,
  Check,
  Download,
  FileText,
  Phone,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from "@/components/icons";
import { useToast } from '@/hooks/use-toast';

const CoverageDetailItem = ({ text, amount }: { text: string; amount: string }) => (
    <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Check className="h-4 w-4 text-primary" />
        </div>
        <div>
            <p className="font-semibold">{text}</p>
            <p className="text-sm text-muted-foreground">{amount}</p>
        </div>
    </div>
);

export default function InsurancePage() {
    const router = useRouter();
    const { toast } = useToast();

    const coverageDetails = [
        { text: 'Accident Coverage', amount: 'Up to ₹2,00,000' },
        { text: 'Hospitalization', amount: 'Up to ₹1,00,000' },
        { text: 'Disability Benefits', amount: 'Up to ₹5,00,000' },
    ];
    
    const handleAction = (title: string, description: string) => {
        toast({ title, description });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Icons.logo className="h-7 w-7 text-primary" />
                </div>
                <h1 className="text-lg font-semibold">Insurance</h1>
                <div className="w-7" />
            </header>

            <main className="flex-1 space-y-6 p-4">
                <Button variant="ghost" onClick={() => router.back()} className="mb-[-1rem] px-0 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Button>

                <Card className="overflow-hidden">
                    <div className="bg-primary p-4 text-primary-foreground">
                        <div className="flex items-center gap-2">
                            <Shield className="h-6 w-6" />
                            <h2 className="text-xl font-bold">Crevings Partner Insurance</h2>
                        </div>
                        <p className="mt-1 text-sm text-primary-foreground/80">
                            You're covered for accidents and medical emergencies
                        </p>
                    </div>
                    <CardContent className="space-y-4 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Policy Number</p>
                                <p className="font-mono font-semibold">CRV-INS-78945612</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                        </div>
                        
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-3">Coverage Details:</h3>
                            <div className="space-y-3">
                                {coverageDetails.map((detail, index) => (
                                    <CoverageDetailItem key={index} text={detail.text} amount={detail.amount} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <Button className="w-full" onClick={() => handleAction('Downloading Certificate', 'Your insurance certificate is being downloaded.')}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Certificate
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => handleAction('Loading Policy Details', 'This feature is coming soon.')}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Policy Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Claim History</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-10">
                         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground text-lg">No Claims Yet</h3>
                        <p className="mt-1 text-sm">Good news! You haven't filed any claims. Stay safe out there!</p>
                    </CardContent>
                </Card>

                <Card>
                     <CardHeader>
                        <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-semibold">Insurance Helpline</p>
                            <p className="text-sm text-muted-foreground">24/7 Support</p>
                        </div>
                        <Button onClick={() => handleAction('Calling Helpline', 'Connecting you to the 24/7 insurance helpline.')}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Now
                        </Button>
                    </CardContent>
                </Card>
                
                 <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-primary/90">"We've got your back! Literally. Our insurance covers those unexpected <span className="font-bold">oopsie moments</span>."</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
