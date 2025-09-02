
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Bell,
  Search,
  HelpCircle,
  CreditCard,
  Phone,
  MessageSquare,
  PlayCircle,
  ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { faqs, contactMethods, videoTutorials } from '@/lib/data';
import type { FaqItem, ContactMethod, VideoTutorial } from '@/lib/types';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const FaqTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <Card className="text-center p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all duration-300">
        <HelpCircle className="h-8 w-8 text-primary" />
        <p className="font-semibold">Order Issues</p>
      </Card>
      <Card className="text-center p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer transition-all duration-300">
        <CreditCard className="h-8 w-8 text-primary" />
        <p className="font-semibold">Payment Help</p>
      </Card>
    </div>

    <Card className="transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  </div>
);

const ContactUsTab = () => {
    const { toast } = useToast();

    const handleCall = () => {
        toast({
            title: "Calling Customer Care...",
            description: "Please wait while we connect you.",
        });
    };

    return (
        <div className="space-y-4">
            {contactMethods.map((method) => {
                const cardBody = (
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <method.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">{method.title}</h3>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                        </div>
                        {method.href ? (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        ) : method.badge ? (
                            <Badge className={cn("bg-green-100 text-green-700 border-green-200")}>{method.badge}</Badge>
                        ) : (
                            <Button onClick={handleCall}>Call</Button>
                        )}
                    </CardContent>
                );

                if (method.href) {
                    return (
                        <Link key={method.id} href={method.href} className="block">
                            <Card className="transition-all duration-300">
                               {cardBody}
                            </Card>
                        </Link>
                    );
                }
                return (
                     <Card key={method.id} className="transition-all duration-300">
                        {cardBody}
                    </Card>
                )
            })}
        </div>
    );
};


const VideoCard = ({ video }: { video: VideoTutorial }) => (
    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
        <Card className="overflow-hidden transition-all duration-300">
            <div className="relative aspect-video">
                <Image 
                    src={video.imageUrl} 
                    alt={video.title} 
                    layout="fill" 
                    objectFit="cover" 
                    data-ai-hint={video.imageHint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                    <PlayCircle className="h-12 w-12 text-white/80" />
                </div>
                <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0">{video.duration}</Badge>
            </div>
            <CardContent className="p-4">
                <h3 className="font-bold">{video.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
            </CardContent>
        </Card>
    </a>
);

const VideosTab = () => (
    <div className="space-y-4">
        {videoTutorials.map(video => (
            <VideoCard key={video.id} video={video} />
        ))}
    </div>
);


export default function HelpAndSupportPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
            </Button>
        </div>
        <h1 className="text-lg font-bold text-primary">Help &amp; Support</h1>
        <div className="relative">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-white pointer-events-none">
              3
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for help topics..." className="pl-10" />
        </div>
        
        <Tabs defaultValue="faqs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="faqs" className="mt-4">
                <FaqTab />
            </TabsContent>
            <TabsContent value="contact" className="mt-4">
                <ContactUsTab />
            </TabsContent>
            <TabsContent value="videos" className="mt-4">
                <VideosTab />
            </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}
