
'use client';

import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  CheckCircle2,
  Clock,
  Eye,
  FileWarning,
  RefreshCcw,
  Upload,
  UploadCloud,
  XCircle,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { documents } from '@/lib/data';
import type { Document, DocumentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const statusConfig: Record<
  DocumentStatus,
  {
    label: string;
    icon: LucideIcon;
    badgeClass: string;
    textClass: string;
    bgClass: string;
  }
> = {
  Verified: {
    label: 'Verified',
    icon: CheckCircle2,
    badgeClass: 'bg-green-100 text-green-800 border-transparent',
    textClass: 'text-green-600',
    bgClass: 'bg-green-50',
  },
  Pending: {
    label: 'Pending',
    icon: Clock,
    badgeClass: 'bg-yellow-100 text-yellow-800 border-transparent',
    textClass: 'text-yellow-600',
    bgClass: 'bg-yellow-50',
  },
  Rejected: {
    label: 'Rejected',
    icon: XCircle,
    badgeClass: 'bg-red-100 text-red-800 border-transparent',
    textClass: 'text-red-600',
    bgClass: 'bg-red-50',
  },
  'Not Uploaded': {
    label: 'Not Uploaded',
    icon: UploadCloud,
    badgeClass: 'bg-gray-100 text-gray-800 border-transparent',
    textClass: 'text-gray-500',
    bgClass: 'bg-gray-50',
  },
};

const VerificationStatusCard = ({
  icon: Icon,
  label,
  count,
  className,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  className: string;
}) => (
  <Card className={cn('p-3 shadow-none border-0 transition-transform hover:scale-105', className)}>
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="font-bold text-lg">{count}</p>
      </div>
    </div>
  </Card>
);

const DocumentCard = ({ doc }: { doc: Document }) => {
  const config = statusConfig[doc.status];
  const { toast } = useToast();

  const handleAction = (title: string) => {
    toast({
        title: title,
        description: "This feature is coming soon.",
    });
  };


  return (
    <Card className="transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold">{doc.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{doc.description}</p>
          </div>
          <Badge variant="outline" className={cn('font-semibold text-xs', config.badgeClass)}>
            <config.icon className="mr-1 h-3.5 w-3.5" />
            {config.label}
          </Badge>
        </div>
        
        {(doc.uploadedDate || doc.expiryDate) && (
          <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
             {doc.uploadedDate && <div>Uploaded: <span className="font-medium text-foreground">{doc.uploadedDate}</span></div>}
             {doc.expiryDate && <div>Expires: <span className="font-medium text-foreground">{doc.expiryDate}</span></div>}
          </div>
        )}

        {doc.status === 'Rejected' && doc.rejectionReason && (
          <Alert variant="destructive" className="mt-3 bg-red-50/80 border-red-200 text-red-900 p-3">
            <FileWarning className="h-4 w-4 !text-red-600" />
            <AlertTitle className="font-semibold text-red-800 text-sm">Rejected</AlertTitle>
            <AlertDescription className="text-red-800 text-xs">
              {doc.rejectionReason}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4 flex items-center gap-3">
            {doc.status !== 'Not Uploaded' && (
                <Button variant="outline" size="sm" onClick={() => handleAction('Viewing Document')}>
                    <Eye className="mr-2 h-4 w-4" /> View
                </Button>
            )}
            {doc.status === 'Rejected' && (
                <Button size="sm" onClick={() => handleAction('Re-uploading Document')}>
                    <RefreshCcw className="mr-2 h-4 w-4" /> Re-upload
                </Button>
            )}
            {doc.status === 'Not Uploaded' && (
                <Button size="sm" className="w-full" onClick={() => handleAction('Uploading Document')}>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentGuidelineItem = ({ number, text }: { number: number; text: string }) => (
    <div className="flex items-start gap-3">
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {number}
        </div>
        <p className="text-sm text-muted-foreground">{text}</p>
    </div>
);


export default function DocumentsPage() {
  const router = useRouter();

  const statusCounts = documents.reduce(
    (acc, doc) => {
      if (doc.status === 'Verified') acc.verified++;
      if (doc.status === 'Pending') acc.pending++;
      if (doc.status === 'Rejected') acc.rejected++;
      if (doc.status === 'Not Uploaded') acc.missing++;
      return acc;
    },
    { verified: 0, pending: 0, rejected: 0, missing: 0 }
  );

  const guidelines = [
      "Upload clear, well-lit photos of your original documents.",
      "Ensure all four corners of the document are visible in the photo.",
      "Document verification usually takes 24-48 hours.",
      "For any issues with document verification, please contact our support team.",
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-semibold">Documents</h1>
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

      <main className="flex-1 space-y-6 p-4">
        <Alert className="border-primary/50 bg-primary/10">
          <AlertCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="font-bold text-primary">Verification Required</AlertTitle>
          <AlertDescription className="text-primary/90">
            Please upload all required documents to complete your profile verification.
          </AlertDescription>
        </Alert>
        
        <Card className="transition-all duration-300">
            <CardContent className="p-4">
                <h3 className="mb-3 font-semibold text-foreground">Verification Status</h3>
                <div className="grid grid-cols-2 gap-3">
                    <VerificationStatusCard icon={CheckCircle2} label="Verified" count={statusCounts.verified} className="bg-green-100/60 text-green-900" />
                    <VerificationStatusCard icon={Clock} label="Pending" count={statusCounts.pending} className="bg-yellow-100/60 text-yellow-900" />
                    <VerificationStatusCard icon={XCircle} label="Rejected" count={statusCounts.rejected} className="bg-red-100/60 text-red-900" />
                    <VerificationStatusCard icon={UploadCloud} label="Missing" count={statusCounts.missing} className="bg-gray-100 text-gray-900" />
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-lg font-semibold mb-3 px-1">Your Documents</h2>
            <div className="space-y-4">
                {documents.map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                ))}
            </div>
        </div>

        <Card className="transition-all duration-300">
            <CardContent className="p-4">
                <h3 className="mb-4 font-semibold text-foreground">Document Guidelines</h3>
                <div className="space-y-3">
                    {guidelines.map((text, index) => (
                        <DocumentGuidelineItem key={index} number={index + 1} text={text} />
                    ))}
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
