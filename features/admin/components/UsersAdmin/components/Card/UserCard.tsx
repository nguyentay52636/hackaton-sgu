"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Eye, Edit } from "lucide-react"
import { motion } from "framer-motion"
import { useAdminLanguage } from "@/features/admin/i18n"
import { User } from "../types"
import { getInitials, getStatusBadge, getRoleBadge } from "../utils"

interface UserCardProps {
    user: User
    index: number
    onViewDetails: (user: User) => void
}

export default function UserCard({ user, index, onViewDetails }: UserCardProps) {
    const { t } = useAdminLanguage()

    return (
        <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>

                        <div className="flex gap-2">
                            {getRoleBadge(user.role)}
                            {getStatusBadge(user.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t">
                            <div>
                                <p className="text-sm text-muted-foreground">Đánh giá</p>
                                <p className="text-lg font-semibold">{user.totalReviews}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Yêu thích</p>
                                <p className="text-lg font-semibold">{user.totalFavorites}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full">
                            <Button
                                variant="outline"
                                className="flex-1 bg-transparent"
                                onClick={() => onViewDetails(user)}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                {t("Xem hồ sơ")}
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                                <Edit className="h-4 w-4 mr-2" />
                                {t("Chỉnh sửa")}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

