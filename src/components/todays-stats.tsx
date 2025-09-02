
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';

const stats = [
    { value: '₹458', label: 'Earnings' },
    { value: '4', label: 'Deliveries' },
    { value: '12km', label: 'Distance' },
]

export default function TodaysStats() {
    return (
        <div>
            <div className="flex justify-between items-center mb-2 px-1">
                <h2 className="text-lg font-semibold">Today's Stats</h2>
                <Link href="/earnings" className="text-sm text-primary font-medium flex items-center">
                    View Details <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {stats.map(stat => (
                    <Card key={stat.label} className="transition-all duration-300">
                        <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                            <p className="text-xl font-bold text-primary">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
