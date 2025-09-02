
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ClipboardList, Wallet, MapPin, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/earnings", label: "Earnings", icon: Wallet },
  { href: "/hubs", label: "Hubs", icon: MapPin },
  { href: "/profile", label: "Profile", icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  // For the home icon, we want it to be active for both "/" and "/home"
  const isHomeActive = pathname === "/" || pathname === "/home";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-card shadow-t">
      <div className="mx-auto grid h-full max-w-lg grid-cols-5 font-medium">
        {navItems.map((item) => {
          const isActive = item.href === "/home" ? isHomeActive : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group inline-flex flex-col items-center justify-center p-2 text-muted-foreground hover:bg-muted hover:text-primary transition-transform duration-200 hover:-translate-y-1 active:translate-y-0",
                isActive && "text-primary"
              )}
            >
              <item.icon className="mb-1 h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
