"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Grid3x3, List, Search } from "lucide-react"

type ViewMode = "grid" | "list"

export default function FiltersBar({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    viewMode,
    setViewMode,
}: {
    searchQuery: string
    setSearchQuery: (v: string) => void
    statusFilter: string
    setStatusFilter: (v: string) => void
    viewMode: ViewMode
    setViewMode: (v: ViewMode) => void
}) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Tìm kiếm theo tên hoặc địa điểm..."
                            className="pl-10 h-11"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                            <TabsList>
                                <TabsTrigger value="all">Tất cả</TabsTrigger>
                                <TabsTrigger value="upcoming">Sắp diễn ra</TabsTrigger>
                                <TabsTrigger value="ongoing">Đang diễn ra</TabsTrigger>
                                <TabsTrigger value="completed">Đã kết thúc</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex border rounded-lg">
                            <Button
                                variant={viewMode === "grid" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="rounded-r-none"
                            >
                                <Grid3x3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="rounded-l-none"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


