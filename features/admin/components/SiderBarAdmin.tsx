"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/shared/ui/button"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useLanguageStore } from "@/stores/language-store"
import {
    ChefHat,
    LayoutDashboard,
    Users,
    MapPin,
    Video,
    Star,
    Calendar,
    Settings,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    User,
} from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { useAdminLanguage } from "../i18n"

interface AdminSidebarProps {
    collapsed: boolean
    onToggle: () => void
}

export default function SiderBarAdmin({ collapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname()
    const { t } = useAdminLanguage()
    const { language, setLanguage } = useLanguageStore()

    const menuItems = [
        { icon: LayoutDashboard, label: t("overview"), href: "/admin" },
        { icon: Users, label: t("users"), href: "/admin/users" },
        { icon: User, label: t("teachers"), href: "/admin/teachers" },
        { icon: User, label: t("students"), href: "/admin/students" },
        { icon: Settings, label: t("settings"), href: "/admin/settings" },

    ]

    return (
        <div
            className={cn(
                "relative h-screen border-r transition-all duration-300 flex flex-col justify-between",
                "bg-gradient-to-b from-background via-background to-muted/20 shadow-lg",
                collapsed ? "w-16" : "w-64",
            )}
        >
            {/* Header/logo section */}
            <div className="flex h-16 items-center justify-between border-b bg-gradient-to-r from-primary/5 to-primary/10 px-4 backdrop-blur-sm">
                {!collapsed && (
                    <Link href="/admin" className="flex items-center gap-2 group">
                        <div className="rounded-lg bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-colors">
                            <ChefHat className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <span className="font-bold text-base block leading-tight">{t("adminDashboard")}</span>
                            <span className="text-[10px] text-muted-foreground">Inclusive Learn</span>
                        </div>
                    </Link>
                )}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggle}
                        className={cn("ml-auto hover:bg-primary/10 hover:text-primary transition-all", collapsed && "mx-auto")}
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Menu section: occupies available space */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <ScrollArea className="flex-1 py-6">
                    <nav className="space-y-2 px-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                            return (
                                <Link key={item.href} href={item.href} className="block">
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full cursor-pointer justify-start gap-3 h-12 transition-all duration-200 rounded-xl px-2",
                                            collapsed && "justify-center px-1",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                                                : "hover:bg-primary/10 hover:translate-x-1",
                                        )}
                                    >
                                        <div className={cn(
                                            "rounded-md p-1.5 flex cursor-pointer items-center justify-center transition-colors",
                                            isActive ? "bg-white/30" : "bg-muted/50"
                                        )}>
                                            <item.icon className="h-5 w-5 shrink-0" />
                                        </div>
                                        {!collapsed && <span className={cn("font-medium text-sm", isActive ? "text-primary-foreground" : "")}>{item.label}</span>}
                                    </Button>
                                </Link>
                            )
                        })}
                    </nav>
                </ScrollArea>
            </div>
            {/* Footer section (optional: for language/settings if muốn) */}
        </div>
    )
}
