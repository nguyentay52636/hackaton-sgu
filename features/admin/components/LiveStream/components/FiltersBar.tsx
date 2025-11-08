"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Calendar, CheckCircle2, Play, Search } from "lucide-react"

type Status = "all" | "live" | "scheduled" | "ended"

export default function FiltersBar({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
}: {
    searchQuery: string
    setSearchQuery: (v: string) => void
    statusFilter: Status
    setStatusFilter: (s: Status) => void
}) {
    const { t } = useAdminLanguage()
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={statusFilter === "all" ? "default" : "outline"}
                            onClick={() => setStatusFilter("all")}
                            className={statusFilter === "all" ? "bg-gradient-to-r from-[#D4145A] to-[#FBB03B]" : ""}
                        >
                            Tất cả
                        </Button>
                        <Button
                            variant={statusFilter === "live" ? "default" : "outline"}
                            onClick={() => setStatusFilter("live")}
                            className={statusFilter === "live" ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                            <Play className="mr-2 h-4 w-4" />
                            {t("live")}
                        </Button>
                        <Button
                            variant={statusFilter === "scheduled" ? "default" : "outline"}
                            onClick={() => setStatusFilter("scheduled")}
                            className={statusFilter === "scheduled" ? "bg-blue-500 hover:bg-blue-600" : ""}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            {t("scheduled")}
                        </Button>
                        <Button
                            variant={statusFilter === "ended" ? "default" : "outline"}
                            onClick={() => setStatusFilter("ended")}
                            className={statusFilter === "ended" ? "bg-gray-500 hover:bg-gray-600" : ""}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {t("ended")}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


