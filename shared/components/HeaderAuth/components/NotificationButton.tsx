"use client"

import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Bell } from "lucide-react"
import { ModeTogger } from "@/shared/ui/ModeTogger"

export function NotificationButton() {
    return (
        <div className="flex items-center gap-2">
            <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full hover:bg-accent/50 hover:ring-2 hover:ring-primary/20 transition-all duration-300 hover:scale-105"
            >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 hover:scale-110" />
                <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-xs font-semibold bg-red-500 animate-pulse">
                    3
                </Badge>
            </Button>
            <ModeTogger />
        </div>
    )
}

