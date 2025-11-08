import { Button } from "@/shared/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card"
import { Star, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function ReviewsList({ pendingReviews, t }: { pendingReviews: { id: number, user: string, restaurant: string, rating: number, comment: string, date: string }[], t: any }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("pendingReviewsTitle")}</CardTitle>
                <CardDescription>{t("moderateReviews")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {pendingReviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{review.user}</span>
                                        <span className="text-muted-foreground">→</span>
                                        <span className="text-muted-foreground">{review.restaurant}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-sm mb-4">{review.comment}</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="default">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {t("approve")}
                                </Button>
                                <Button size="sm" variant="outline">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    {t("reject")}
                                </Button>
                                <Button size="sm" variant="ghost">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    {t("report")}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
