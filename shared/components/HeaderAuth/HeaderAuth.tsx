"use client"

import { Logo, DesktopNav, UserMenu, NotificationButton, MobileMenu, LanguageSwitcher, AuthButtons } from "./components"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/Slice/authSlice"

export function HeaderAuth() {
    const { isAuthenticated } = useSelector(selectAuth)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-200/50 dark:border-indigo-500/20 bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 sm:h-20 items-center justify-between">
                    <Logo />
                    <DesktopNav />
                    <div className="flex items-center gap-2 sm:gap-3">
                        <LanguageSwitcher />
                        <NotificationButton />
                        {isAuthenticated ? <UserMenu /> : <AuthButtons />}
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}
