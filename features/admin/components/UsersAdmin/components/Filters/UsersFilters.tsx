"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Search, Grid3x3, List } from "lucide-react"
import { useAdminLanguage } from "@/features/admin/i18n"

interface UsersFiltersProps {
    searchQuery: string
    roleFilter: string
    statusFilter: string
    viewMode: "table" | "grid"
    onSearchChange: (value: string) => void
    onRoleFilterChange: (value: string) => void
    onStatusFilterChange: (value: string) => void
    onViewModeChange: (mode: "table" | "grid") => void
}

export default function UsersFilters({
    searchQuery,
    roleFilter,
    statusFilter,
    viewMode,
    onSearchChange,
    onRoleFilterChange,
    onStatusFilterChange,
    onViewModeChange,
}: UsersFiltersProps) {
    const { t } = useAdminLanguage()

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <CardTitle>{t("Danh sách người dùng")}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === "table" ? "default" : "outline"}
                                size="icon"
                                onClick={() => onViewModeChange("table")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => onViewModeChange("grid")}
                            >
                                <Grid3x3 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t("Tìm kiếm người dùng")}
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>

                        <Tabs value={roleFilter} onValueChange={onRoleFilterChange} className="w-full sm:w-auto">
                            <TabsList>
                                <TabsTrigger value="all">{t("Tất cả")}</TabsTrigger>
                                <TabsTrigger value="user">{t("Người dùng")}</TabsTrigger>
                                <TabsTrigger value="owner">{t("Chủ quán")}</TabsTrigger>
                                <TabsTrigger value="admin">{t("Quản trị viên")}</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Tabs value={statusFilter} onValueChange={onStatusFilterChange} className="w-full sm:w-auto">
                            <TabsList>
                                <TabsTrigger value="all">{t("Tất cả")}</TabsTrigger>
                                <TabsTrigger value="active">{t("Hoạt động")}</TabsTrigger>
                                <TabsTrigger value="suspended">{t("Tạm khóa")}</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}

