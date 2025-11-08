"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/shared/ui/button"
import { Shield } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { navItems } from "./routes"
import { useTranslation } from "@/shared/contexts/TranslationContext"

const translationMap: Record<string, string> = {
    "Trang chủ": "home",
    "Về chúng tôi": "about",
    "Không gian làm việc": "Không gian làm việc",
    "Ghi chú học tập": "Ghi chú học tập",
    "Luyện phát âm": "Luyện phát âm",
    "Tóm tắt thông minh": "Tóm tắt thông minh",
    "Dịch thuật": "Dịch thuật",
}

export function DesktopNav() {
    const pathname = usePathname()
    const { t } = useTranslation()

    return (
        <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const translationKey = translationMap[item.label] || item.label
                return (
                    <Button
                        key={item.href}
                        asChild
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                            "gap-2 h-9 px-3.5 transition-all duration-300 rounded-lg",
                            isActive && "shadow-md shadow-primary/20",
                            !isActive && "hover:bg-accent/50"
                        )}
                        size="sm"
                    >
                        <Link href={item.href} className="flex items-center">
                            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                            <span className="font-medium text-sm">{t(translationKey as any)}</span>
                        </Link>
                    </Button>
                )
            })}
            <Button
                asChild
                variant={pathname?.startsWith("/admin") ? "default" : "ghost"}
                className={cn(
                    "gap-2 h-9 px-3.5 transition-all duration-300 ml-2 rounded-lg",
                    pathname?.startsWith("/admin") &&
                    "shadow-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white",
                    !pathname?.startsWith("/admin") && "hover:bg-accent/50"
                )}
                size="sm"
            >
                <Link href="/admin" className="flex items-center">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium text-sm">{t('admin')}</span>
                </Link>
            </Button>
        </nav>
    )
}

