"use client"

import { motion } from "framer-motion"
import { Card } from "@/shared/ui/card"
import { useAdminLanguage } from "@/features/admin/i18n"
import {
    MessageSquare,
    AlertTriangle,
    CheckCircle,
    XCircle,
    TrendingUp,
} from "lucide-react"
import { Review } from "./data"

interface ReviewsStatsProps {
    reviews: Review[]
}

export default function ReviewsStats({ reviews }: ReviewsStatsProps) {
    const { t } = useAdminLanguage()

    const totalReviews = reviews.length
    const pendingReviews = reviews.filter((r) => r.status === "pending").length
    const approvedReviews = reviews.filter((r) => r.status === "approved").length
    const rejectedReviews = reviews.filter((r) => r.status === "rejected").length
    const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t("totalReviews")}</p>
                            <p className="text-2xl font-bold">{totalReviews}</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-blue-500" />
                    </div>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6 border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t("pending")}</p>
                            <p className="text-2xl font-bold">{pendingReviews}</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    </div>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6 border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t("approvedReviews")}</p>
                            <p className="text-2xl font-bold">{approvedReviews}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="p-6 border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t("rejectedReviews")}</p>
                            <p className="text-2xl font-bold">{rejectedReviews}</p>
                        </div>
                        <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t("averageRating")}</p>
                            <p className="text-2xl font-bold">{averageRating}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

