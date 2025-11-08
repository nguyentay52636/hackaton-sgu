"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Input } from "@/shared/ui/input"
import { Search } from "lucide-react"
import HeaderBar from "./components/HeaderBar"
import RestaurantsTable from "./components/RestaurantsTable"
import { restaurants as restaurantsData } from "./data"

export default function Restaurent() {
    const [searchQuery, setSearchQuery] = useState("")

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
            active: { variant: "default", label: "Hoạt động" },
            pending: { variant: "secondary", label: "Chờ duyệt" },
            suspended: { variant: "destructive", label: "Tạm khóa" },
        }
        const config = variants[status] || variants.active
        return <Badge variant={config.variant}>{config.label}</Badge>
    }

    const filteredRestaurants = restaurantsData.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="space-y-6">
            <HeaderBar />

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Danh sách nhà hàng</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Tìm kiếm nhà hàng..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <RestaurantsTable restaurants={filteredRestaurants} getStatusBadge={getStatusBadge} />
                </CardContent>
            </Card>
        </div>
    )
}
