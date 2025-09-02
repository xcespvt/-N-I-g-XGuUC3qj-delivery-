
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Info,
  Upload,
  FileText,
  Camera,
  CheckCircle,
  Receipt,
  IndianRupee,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const pastReimbursements = [
    { id: 'REIM-001', date: 'May 10, 2025', amount: 250, status: 'Approved', reimbursedAmount: 150 },
    { id: 'REIM-002', date: 'April 22, 2025', amount: 400, status: 'Approved', reimbursedAmount: 240 },
];

export default function MedicineReimbursementPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [billAmount, setBillAmount] = useState('');
    const [medicalBill, setMedicalBill] = useState<File | null>(null);
    const [medicinePhoto, setMedicinePhoto] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const parsedBillAmount = parseFloat(billAmount);
    const reimbursementAmount = isNaN(parsedBillAmount) ? 0 : Math.min(parsedBillAmount * 0.6, 300);

    const handleSubmit = () => {
        if (!billAmount || !medicalBill || !medicinePhoto) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill in all fields and upload both documents.',
            });
            return;
        }

        setIsSubmitting(true);
        toast({
            title: 'Submitting Request...',
            description: 'Your reimbursement request is being processed.',
        });

        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: 'Request Submitted!',
                description: 'Your reimbursement request has been received and will be reviewed within 2-3 business days.',
            });
            router.back();
        }, 1500);
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold">Medicine Reimbursement</h1>
                <div className="w-8" />
            </header>

            <main className="flex-1 space-y-6 p-4 pb-28">
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Reimbursement Policy</AlertTitle>
                    <AlertDescription>
                        Get 60% of your medical bill amount reimbursed, up to a maximum of ₹300 per claim.
                    </AlertDescription>
                </Alert>

                <Card>
                    <CardHeader>
                        <CardTitle>New Reimbursement Claim</CardTitle>
                        <CardDescription>Fill in the details below to submit your claim.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="bill-amount">Total Bill Amount</Label>
                            <div className="relative mt-1">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="bill-amount"
                                    type="number"
                                    placeholder="Enter total amount from bill"
                                    value={billAmount}
                                    onChange={(e) => setBillAmount(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Upload Medical Bill</Label>
                             <Label htmlFor="medical-bill-input" className="mt-1 flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center">
                                    <FileText className="w-6 h-6 mb-1 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        {medicalBill ? <span className="text-primary">{medicalBill.name}</span> : 'Upload Prescription/Bill'}
                                    </p>
                                </div>
                                <Input id="medical-bill-input" type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => setMedicalBill(e.target.files?.[0] || null)} />
                            </Label>
                        </div>
                        
                        <div>
                            <Label>Upload Photo of Medicine</Label>
                             <Label htmlFor="medicine-photo-input" className="mt-1 flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center">
                                    <Camera className="w-6 h-6 mb-1 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        {medicinePhoto ? <span className="text-primary">{medicinePhoto.name}</span> : 'Upload Medicine Photo'}
                                    </p>
                                </div>
                                <Input id="medicine-photo-input" type="file" className="hidden" accept="image/*" onChange={(e) => setMedicinePhoto(e.target.files?.[0] || null)} />
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Claim History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pastReimbursements.length > 0 ? (
                             <div className="divide-y">
                                {pastReimbursements.map(item => (
                                    <div key={item.id} className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                <Receipt className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{item.id}</p>
                                                <p className="text-xs text-muted-foreground">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">₹{item.reimbursedAmount}</p>
                                            <p className="text-xs text-muted-foreground">From ₹{item.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-center text-muted-foreground py-4">No past reimbursement claims.</p>
                        )}
                    </CardContent>
                </Card>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/90 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Reimbursement Amount</span>
                    <span className="text-lg font-bold text-primary">₹{reimbursementAmount.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full" onClick={handleSubmit} disabled={isSubmitting || reimbursementAmount <= 0}>
                    {isSubmitting ? 'Submitting...' : 'Submit for Reimbursement'}
                </Button>
            </div>
        </div>
    );
}
