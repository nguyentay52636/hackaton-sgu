"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Card, CardContent } from "@/shared/ui/card"
import { Mail, Calendar, Activity } from "lucide-react"
import { useAdminLanguage } from "@/features/admin/i18n"
import { User } from "../types"
import { getInitials, getStatusBadge, getRoleBadge } from "../utils"

interface UserDetailDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    user: User | null
}

export default function UserDetailDialog({ isOpen, onOpenChange, user }: UserDetailDialogProps) {
    const { t } = useAdminLanguage()

    if (!user) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{t("Chi tiết người dùng")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">{user.name}</h3>
                            <div className="flex gap-2">
                                {getRoleBadge(user.role)}
                                {getStatusBadge(user.status)}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{t("Email")}:</span>
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{t("Tham gia")}:</span>
                                <span className="font-medium">{user.joinDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Activity className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{t("Hoạt động")}:</span>
                                <span className="font-medium">{user.lastActive}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">{t("Tổng đánh giá")}</span>
                                            <span className="font-semibold">{user.totalReviews}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">{t("Yêu thích")}</span>
                                            <span className="font-semibold">{user.totalFavorites}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

