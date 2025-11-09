"use client"

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { LogIn, UserPlus } from "lucide-react"

export function AuthButtons() {
    return (
        <div className="flex items-center gap-2">
            <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:flex"
            >
                <Link href="/auth/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Đăng nhập
                </Link>
            </Button>
            <Button
                asChild
                size="sm"
                className="hidden sm:flex"
            >
                <Link href="/auth/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Đăng ký
                </Link>
            </Button>
            {/* Mobile buttons */}
            <Button
                asChild
                variant="ghost"
                size="sm"
                className="sm:hidden"
            >
                <Link href="/auth/login">
                    <LogIn className="h-4 w-4" />
                </Link>
            </Button>
            <Button
                asChild
                size="sm"
                className="sm:hidden"
            >
                <Link href="/auth/signup">
                    <UserPlus className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    )
}

