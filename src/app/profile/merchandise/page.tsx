
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Search, ShoppingBag, Shirt, Shield, Star, Plus, PersonStanding, CloudRain, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { MerchandiseItem } from '@/lib/types';
import { merchandise } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PantsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22a2 2 0 0 1-2-2v-9.5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2Z" />
    <path d="M6 22a2 2 0 0 0-2-2v-9.5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2V20a2 2 0 0 0-2 2Z" />
    <path d="M18 22a2 2 0 0 1-2-2v-9.5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2Z" />
    <path d="M4 10.5a2.5 2.5 0 0 1-2-2.5V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2.5 2.5 0 0 1-2 2.5" />
    <path d="M10 12H8" />
    <path d="M16 12h-2" />
  </svg>
);


const categories = [
    { name: "Half T-Shirt", icon: Shirt },
    { name: "Full T-Shirt", icon: Shirt },
    { name: "Pants", icon: PantsIcon },
    { name: "Helmet", icon: Shield },
    { name: "Delivery Bag", icon: ShoppingBag },
    { name: "Raincoat", icon: CloudRain },
    { name: "Hoodie", icon: Shirt },
    { name: "Ladies' Suit", icon: PersonStanding },
];

const CategoryPill = ({ icon: Icon, label, isActive }: { icon: LucideIcon; label: string; isActive?: boolean }) => (
    <div className={cn(
        "flex-shrink-0 flex flex-col items-center justify-center gap-2 cursor-pointer group w-24 text-center",
        isActive && "text-primary"
    )}>
        <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl bg-muted transition-all group-hover:bg-primary/10",
            isActive ? "bg-primary/10" : "bg-muted"
        )}>
            <Icon className={cn("h-8 w-8 text-muted-foreground group-hover:text-primary", isActive && "text-primary")} />
        </div>
        <p className={cn("text-xs font-medium text-muted-foreground group-hover:text-primary", isActive && "text-primary")}>
            {label}
        </p>
    </div>
);


const ProductCard = ({ item }: { item: MerchandiseItem }) => {
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); 
    toast({
      title: "Added to Cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/profile/merchandise/${item.id}`} className="block">
        <Card className="overflow-hidden transition-all duration-300 group w-full cursor-pointer">
            <CardContent className="p-0">
                <div className="relative aspect-square w-full bg-muted/50">
                    <Image
                        src={item.imageUrls[0]}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={item.imageHint}
                        className="transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-3 space-y-2">
                    <h3 className="font-bold truncate text-base">{item.name}</h3>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">(12)</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-lg">{item.price}</p>
                        <Button size="icon" className="h-8 w-8 rounded-full" onClick={handleAddToCart}>
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add to Cart</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </Link>
  );
};

export default function MerchandisePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white pb-20">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
        </Button>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search store..." className="pl-10 h-10" />
        </div>
        <div className="relative">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white pointer-events-none">2</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-4">
        
        <Card className="bg-primary text-primary-foreground overflow-hidden">
            <div className="relative p-6 flex items-center justify-between">
                <div className="relative z-10">
                    <Badge className="bg-yellow-400 text-yellow-900 font-bold mb-2">Special Offer</Badge>
                    <h2 className="text-xl font-bold">50% OFF</h2>
                    <p className="text-sm text-primary-foreground/80 mt-1 max-w-xs">
                        on all weather protection gear!
                    </p>
                </div>
                <div className="relative z-10">
                   <Briefcase className="h-16 w-16 text-white/20" />
                </div>
            </div>
        </Card>

        <div>
            <h3 className="font-bold text-lg mb-3">Categories</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {categories.map((category, index) => (
                    <CategoryPill key={index} icon={category.icon} label={category.name} isActive={index === 0} />
                ))}
            </div>
        </div>


        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">Super Deals</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {merchandise.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
