"use client"

import { Review } from "./data"
import ReviewCard from "./ReviewCard"

interface ReviewsListProps {
    reviews: Review[]
    onViewDetails: (review: Review) => void
    onApprove: (reviewId: string) => void
    onReject: (reviewId: string) => void
    onDelete: (reviewId: string) => void
}

export default function ReviewsList({
    reviews,
    onViewDetails,
    onApprove,
    onReject,
    onDelete,
}: ReviewsListProps) {
    return (
        <div className="grid gap-4">
            {reviews.map((review, index) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    index={index}
                    onViewDetails={onViewDetails}
                    onApprove={onApprove}
                    onReject={onReject}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

