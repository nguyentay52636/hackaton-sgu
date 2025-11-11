"use client"

import { Button } from "@/shared/ui/button"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export function ProfileHeader() {
    return (
        <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/workspace">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Hồ sơ cá nhân</h1>
                            <p className="text-sm text-muted-foreground">Quản lý tài khoản và thống kê</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

