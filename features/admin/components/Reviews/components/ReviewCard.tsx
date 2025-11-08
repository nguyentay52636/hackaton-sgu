"use client"

import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Card } from "@/shared/ui/card"
import { useAdminLanguage } from "@/features/admin/i18n"
import {
    CheckCircle,
    XCircle,
    Trash2,
    Eye,
} from "lucide-react"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Review } from "./data"
import { getStatusColor, renderStars } from "./utils"

interface ReviewCardProps {
    review: Review
    index: number
    onViewDetails: (review: Review) => void
    onApprove: (reviewId: string) => void
    onReject: (reviewId: string) => void
    onDelete: (reviewId: string) => void
}

export default function ReviewCard({
    review,
    index,
    onViewDetails,
    onApprove,
    onReject,
    onDelete,
}: ReviewCardProps) {
    const { t } = useAdminLanguage()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Card className="p-6 hover:shadow-lg transition-all">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                                <AvatarFallback>{review.userName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{review.userName}</p>
                                <p className="text-sm text-muted-foreground">{review.restaurantName}</p>
                            </div>
                        </div>
                        <Badge className={getStatusColor(review.status)}>{t(review.status)}</Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                    </div>

                    {/* Comment */}
                    <p className="text-sm">{review.comment}</p>

                    {/* Images */}
                    {review.images.length > 0 && (
                        <div className="flex gap-2">
                            {review.images.map((image, idx) => (
                                <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg border">
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Review ${idx + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Report Reason */}
                    {review.status === "reported" && review.reportReason && (
                        <div className="rounded-lg bg-orange-500/10 p-3 border border-orange-500/20">
                            <p className="text-sm font-medium text-orange-600">
                                {t("reportReason")}: {review.reportReason}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onViewDetails(review)} className="gap-2">
                            <Eye className="h-4 w-4" />
                            {t("viewDetails")}
                        </Button>
                        {review.status === "pending" && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onApprove(review.id)}
                                    className="gap-2 text-green-600 hover:bg-green-50"
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    {t("approve")}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onReject(review.id)}
                                    className="gap-2 text-red-600 hover:bg-red-50"
                                >
                                    <XCircle className="h-4 w-4" />
                                    {t("reject")}
                                </Button>
                            </>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(review.id)}
                            className="gap-2 text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                            {t("delete")}
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

