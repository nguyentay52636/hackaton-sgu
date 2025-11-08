"use client"

import { useState } from "react"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Review, reviews } from "./components/data"
import ReviewsHeader from "./components/ReviewsHeader"
import ReviewsStats from "./components/ReviewsStats"
import ReviewsFilters from "./components/ReviewsFilters"
import ReviewsList from "./components/ReviewsList"
import ReviewDetailDialog from "./components/ReviewDetailDialog"

export default function Reviews() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected" | "reported">("all")
    const [ratingFilter, setRatingFilter] = useState<number | null>(null)
    const [selectedReview, setSelectedReview] = useState<Review | null>(null)
    const [showDetailDialog, setShowDetailDialog] = useState(false)
    const [moderationNote, setModerationNote] = useState("")

    // Filter reviews
    const filteredReviews = reviews.filter((review) => {
        const matchesSearch =
            review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || review.status === statusFilter
        const matchesRating = ratingFilter === null || review.rating === ratingFilter

        return matchesSearch && matchesStatus && matchesRating
    })

    const handleApprove = (reviewId: string) => {
        console.log("Approve review:", reviewId)
    }

    const handleReject = (reviewId: string) => {
        console.log("Reject review:", reviewId)
    }

    const handleDelete = (reviewId: string) => {
        console.log("Delete review:", reviewId)
    }

    const handleViewDetails = (review: Review) => {
        setSelectedReview(review)
        setModerationNote(review.moderationNote || "")
        setShowDetailDialog(true)
    }

    const handleSaveModerationNote = () => {
        console.log("Save moderation note:", moderationNote)
        setShowDetailDialog(false)
    }

    return (
        <div className="space-y-6 p-6">
            <ReviewsHeader />

            <ReviewsStats reviews={reviews} />

            <ReviewsFilters
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                ratingFilter={ratingFilter}
                onSearchChange={setSearchQuery}
                onStatusFilterChange={setStatusFilter}
                onRatingFilterChange={setRatingFilter}
            />

            <ReviewsList
                reviews={filteredReviews}
                onViewDetails={handleViewDetails}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
            />

            <ReviewDetailDialog
                open={showDetailDialog}
                review={selectedReview}
                moderationNote={moderationNote}
                onOpenChange={setShowDetailDialog}
                onModerationNoteChange={setModerationNote}
                onSave={handleSaveModerationNote}
            />
        </div>
    )
}
