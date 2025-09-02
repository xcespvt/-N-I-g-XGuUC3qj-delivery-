
'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { merchandise } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';


export default function MerchandiseDetailPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const item = merchandise.find(i => i.id === params.id);
    const { toast } = useToast();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    if (!item) {
        notFound();
    }
    
    const handleAddToCart = () => {
        if (!selectedSize && item.category === 'Apparel') {
            toast({
                variant: 'destructive',
                title: 'Please select a size.',
            });
            return;
        }
        toast({
            title: 'Added to Cart!',
            description: `${quantity} x ${item.name} ${selectedSize ? `(Size: ${selectedSize})` : ''} has been added to your cart.`,
        });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-lg font-semibold truncate">{item.name}</h1>
                <Link href="/cart">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-white pointer-events-none">2</span>
                    </Button>
                </Link>
            </header>

            <main className="flex-1 pb-24 lg:pb-16">
                <div className="container mx-auto max-w-6xl py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {item.imageUrls.map((url, index) => (
                                <CarouselItem key={index}>
                                    <div className="aspect-square relative w-full overflow-hidden rounded-lg bg-muted">
                                        <Image
                                            src={url}
                                            alt={`${item.name} - view ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                            data-ai-hint={item.imageHint}
                                        />
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </Carousel>
                        
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold">{item.name}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">(12 Reviews)</span>
                                </div>
                                <p className="text-3xl font-bold text-primary mt-4">{item.price}</p>
                            </div>

                            <Separator />
                            
                            {item.category === 'Apparel' && (
                                <div>
                                    <h3 className="text-base font-semibold mb-3">Select Size</h3>
                                    <ToggleGroup type="single" onValueChange={setSelectedSize} variant="outline" className="justify-start">
                                        <ToggleGroupItem value="S" className="h-10 w-10">S</ToggleGroupItem>
                                        <ToggleGroupItem value="M" className="h-10 w-10">M</ToggleGroupItem>
                                        <ToggleGroupItem value="L" className="h-10 w-10">L</ToggleGroupItem>
                                        <ToggleGroupItem value="XL" className="h-10 w-10">XL</ToggleGroupItem>
                                        <ToggleGroupItem value="XXL" className="h-10 w-10">XXL</ToggleGroupItem>
                                    </ToggleGroup>
                                </div>
                            )}

                            <div>
                                <h3 className="text-base font-semibold mb-3">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => setQuantity(q => Math.max(1, q-1))}>
                                        <Minus className="h-4 w-4"/>
                                    </Button>
                                    <span className="text-xl font-bold w-10 text-center">{quantity}</span>
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => setQuantity(q => q+1)}>
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            
                            <Accordion type="single" collapsible defaultValue="description" className="w-full">
                                <AccordionItem value="description">
                                    <AccordionTrigger className="text-base">Product Details</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        High-quality, breathable fabric perfect for long delivery hours. Reinforced stitching for durability. Features the official Crevings logo. Machine washable.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="shipping">
                                    <AccordionTrigger className="text-base">Shipping & Returns</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Ships within 2-3 business days. Free returns within 30 days of delivery.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/90 p-4 backdrop-blur-sm">
                <div className="container mx-auto max-w-6xl">
                    <Button size="lg" className="w-full h-12 text-base" onClick={handleAddToCart}>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                </div>
            </footer>
        </div>
    );
}
