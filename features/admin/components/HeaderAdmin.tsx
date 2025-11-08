import React from 'react'
import { Button } from "@/shared/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { LanguageSwitcher } from "@/shared/components/HeaderAuth/components"
import { ModeTogger } from "@/shared/ui/ModeTogger"
import { Bell, User } from 'lucide-react'
import Link from 'next/link'
import { useAdminLanguage } from '../i18n'
import { ArrowLeft } from 'lucide-react'
export default function HeaderAdmin() {
    const { t } = useAdminLanguage()
    return (
        <>
            <header className="flex h-16 items-center justify-between border-b bg-card px-6">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t("backToHome")}
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ModeTogger />
                    {/* Notifications */}
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div>
                                    <p className="font-semibold">Admin User</p>
                                    <p className="text-xs text-muted-foreground">admin@saigonculinary.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="h-4 w-4 mr-2" />
                                {t("profile")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell className="h-4 w-4 mr-2" />
                                {t("notifications")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">{t("logout")}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </>

    )
}
