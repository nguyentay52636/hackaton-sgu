"use client"

import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Textarea } from "@/shared/ui/textarea"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/dialog"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Review } from "./data"
import { getStatusColor, renderStars } from "./utils"

interface ReviewDetailDialogProps {
    open: boolean
    review: Review | null
    moderationNote: string
    onOpenChange: (open: boolean) => void
    onModerationNoteChange: (note: string) => void
    onSave: () => void
}

export default function ReviewDetailDialog({
    open,
    review,
    moderationNote,
    onOpenChange,
    onModerationNoteChange,
    onSave,
}: ReviewDetailDialogProps) {
    const { t } = useAdminLanguage()

    if (!review) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t("reviewDetails")}</DialogTitle>
                    <DialogDescription>
                        {t("viewDetails")} và {t("addNote")}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{review.userName}</p>
                            <p className="text-sm text-muted-foreground">{t("reviewer")}</p>
                        </div>
                    </div>

                    {/* Restaurant */}
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("restaurant")}</p>
                        <p className="font-semibold">{review.restaurantName}</p>
                    </div>

                    {/* Rating */}
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("rating")}</p>
                        {renderStars(review.rating)}
                    </div>

                    {/* Date */}
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("reviewDate")}</p>
                        <p>{new Date(review.createdAt).toLocaleString("vi-VN")}</p>
                    </div>

                    {/* Comment */}
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("reviewText")}</p>
                        <p className="mt-1">{review.comment}</p>
                    </div>

                    {/* Images */}
                    {review.images.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{t("reviewImages")}</p>
                            <div className="grid grid-cols-3 gap-2">
                                {review.images.map((image, idx) => (
                                    <div key={idx} className="relative aspect-square overflow-hidden rounded-lg border">
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Review ${idx + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Status */}
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("status")}</p>
                        <Badge className={getStatusColor(review.status)}>{t(review.status)}</Badge>
                    </div>

                    {/* Moderation Note */}
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{t("moderationNote")}</p>
                        <Textarea
                            value={moderationNote}
                            onChange={(e) => onModerationNoteChange(e.target.value)}
                            placeholder={t("addNote")}
                            rows={3}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {t("cancel")}
                    </Button>
                    <Button
                        onClick={onSave}
                        className="bg-gradient-to-r from-[#D4145A] to-[#FBB03B] text-white"
                    >
                        {t("save")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

