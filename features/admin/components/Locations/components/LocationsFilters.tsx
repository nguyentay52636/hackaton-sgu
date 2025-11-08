"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Search, Grid3x3, List } from "lucide-react"
import { useAdminLanguage } from "@/features/admin/i18n"

interface LocationsFiltersProps {
    searchQuery: string
    statusFilter: string
    categoryFilter: string
    viewMode: "table" | "grid"
    onSearchChange: (value: string) => void
    onStatusFilterChange: (value: string) => void
    onCategoryFilterChange: (value: string) => void
    onViewModeChange: (mode: "table" | "grid") => void
}

export default function LocationsFilters({
    searchQuery,
    statusFilter,
    categoryFilter,
    viewMode,
    onSearchChange,
    onStatusFilterChange,
    onCategoryFilterChange,
    onViewModeChange,
}: LocationsFiltersProps) {
    const { t } = useAdminLanguage()

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("Tìm kiếm")}
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder={t("Trạng thái")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("Tất cả")}</SelectItem>
                            <SelectItem value="active">{t("Hoạt động")}</SelectItem>
                            <SelectItem value="pending">{t("Chờ duyệt")}</SelectItem>
                            <SelectItem value="inactive">{t("Ngừng hoạt động")}</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder={t("Danh mục")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("Tất cả")}</SelectItem>
                            <SelectItem value="Phở">{t("Phở")}</SelectItem>
                            <SelectItem value="Bánh Mì">{t("Bánh Mì")}</SelectItem>
                            <SelectItem value="Cơm Tấm">{t("Cơm Tấm")}</SelectItem>
                            <SelectItem value="Bún">{t("Bún")}</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="icon"
                            onClick={() => onViewModeChange("grid")}
                        >
                            <Grid3x3 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "table" ? "default" : "outline"}
                            size="icon"
                            onClick={() => onViewModeChange("table")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

