"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import { User, Shield, LogOut } from "lucide-react"
import { useTranslation } from "@/shared/contexts/TranslationContext"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { selectAuth, logout } from "@/redux/Slice/authSlice"

export function UserMenu() {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector(selectAuth)

    const handleLogout = () => {
        dispatch(logout())
        router.push("/")
    }

    // Get user initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full hover:ring-2 hover:ring-primary/30 transition-all duration-300 hover:scale-105"
                >
                    <Avatar className="h-10 w-10 sm:h-11 sm:w-11 ring-2 ring-border/50 hover:ring-primary/50 transition-all duration-300">
                        <AvatarImage src={user?.avatar || "/diverse-user-avatars.png"} alt={user?.name || "User"} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-bold text-base sm:text-lg">
                            {user?.name ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 shadow-xl border-border/50" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2 p-2">
                        <p className="text-base font-semibold leading-none">{user?.name}</p>
                        <p className="text-sm leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                        <Badge variant="secondary" className="w-fit">
                            {user?.role}
                        </Badge>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer py-3">
                        <User className="mr-3 h-5 w-5" />
                        <span className="text-base">{t('profile')}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer py-3">
                        <Shield className="mr-3 h-5 w-5" />
                        <span className="text-base">{t('admin')}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive py-3"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="text-base">{t('logout')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

