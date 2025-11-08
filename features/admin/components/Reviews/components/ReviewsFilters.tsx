"use client"

import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Card } from "@/shared/ui/card"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Search, Filter, Star } from "lucide-react"

interface ReviewsFiltersProps {
    searchQuery: string
    statusFilter: "all" | "pending" | "approved" | "rejected" | "reported"
    ratingFilter: number | null
    onSearchChange: (value: string) => void
    onStatusFilterChange: (status: "all" | "pending" | "approved" | "rejected" | "reported") => void
    onRatingFilterChange: (rating: number | null) => void
}

export default function ReviewsFilters({
    searchQuery,
    statusFilter,
    ratingFilter,
    onSearchChange,
    onStatusFilterChange,
    onRatingFilterChange,
}: ReviewsFiltersProps) {
    const { t } = useAdminLanguage()

    return (
        <Card className="p-6">
            <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder={t("search")}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                    {["all", "pending", "approved", "rejected", "reported"].map((status) => (
                        <Button
                            key={status}
                            variant={statusFilter === status ? "default" : "outline"}
                            size="sm"
                            onClick={() => onStatusFilterChange(status as any)}
                            className={statusFilter === status ? "bg-gradient-to-r from-[#D4145A] to-[#FBB03B] text-white" : ""}
                        >
                            {t(status)}
                        </Button>
                    ))}
                </div>

                {/* Rating Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t("filterByRating")}:</span>
                    <div className="flex gap-2">
                        <Button
                            variant={ratingFilter === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => onRatingFilterChange(null)}
                            className={ratingFilter === null ? "bg-gradient-to-r from-[#D4145A] to-[#FBB03B] text-white" : ""}
                        >
                            {t("all")}
                        </Button>
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <Button
                                key={rating}
                                variant={ratingFilter === rating ? "default" : "outline"}
                                size="sm"
                                onClick={() => onRatingFilterChange(rating)}
                                className={ratingFilter === rating ? "bg-gradient-to-r from-[#D4145A] to-[#FBB03B] text-white" : ""}
                            >
                                {rating} <Star className="ml-1 h-3 w-3" />
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}

