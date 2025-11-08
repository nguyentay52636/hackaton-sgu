"use client"

import { useState } from "react"
import {
    LocationsAdminHeader,
    LocationsStatsCards,
    LocationsFilters,
    LocationCard,
    LocationsTable,
    LocationDetailDialog,
    type Location,
} from "./components"

export default function LocationsAdmin() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [viewMode, setViewMode] = useState<"table" | "grid">("grid")
    const [statusFilter, setStatusFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")

    const locations: Location[] = [
        {
            id: 1,
            name: "Phở Hòa Pasteur",
            address: "260C Pasteur, Quận 3, TP.HCM",
            phone: "028 3829 7943",
            category: "Phở",
            rating: 4.8,
            reviews: 1234,
            lat: 10.7769,
            lng: 106.6951,
            status: "active",
            image: "/img/pho-bowl.jpg",
            openTime: "06:00 - 22:00",
            description: "Quán phở truyền thống với hương vị đậm đà, nước dùng được ninh từ xương trong nhiều giờ.",
        },
        {
            id: 2,
            name: "Bánh Mì Huỳnh Hoa",
            address: "26 Lê Thị Riêng, Quận 1, TP.HCM",
            phone: "028 3925 4839",
            category: "Bánh Mì",
            rating: 4.9,
            reviews: 2341,
            lat: 10.7679,
            lng: 106.6903,
            status: "active",
            image: "/img/banh-mi-sandwich.jpg",
            openTime: "15:00 - 23:00",
            description: "Bánh mì đặc biệt với nhân thịt đầy đặn, rau sống tươi ngon.",
        },
        {
            id: 3,
            name: "Cơm Tấm Mộc",
            address: "11 Nguyễn Văn Cừ, Quận 5, TP.HCM",
            phone: "028 3855 7891",
            category: "Cơm Tấm",
            rating: 4.7,
            reviews: 876,
            lat: 10.7545,
            lng: 106.6662,
            status: "pending",
            image: "/img/com-tam-rice.jpg",
            openTime: "07:00 - 21:00",
            description: "Cơm tấm sườn nướng thơm ngon, ăn kèm với nước mắm pha chuẩn vị.",
        },
        {
            id: 4,
            name: "Bún Bò Huế Đông Ba",
            address: "45 Đinh Tiên Hoàng, Quận 1, TP.HCM",
            phone: "028 3822 5678",
            category: "Bún",
            rating: 4.6,
            reviews: 654,
            lat: 10.7756,
            lng: 106.7019,
            status: "active",
            image: "/img/bun-bo-hue.png",
            openTime: "06:30 - 20:00",
            description: "Bún bò Huế chuẩn vị xứ Huế, nước dùng đậm đà cay nồng.",
        },
    ]

    const stats = {
        total: locations.length,
        active: locations.filter((l) => l.status === "active").length,
        pending: locations.filter((l) => l.status === "pending").length,
        avgRating: (locations.reduce((sum, l) => sum + l.rating, 0) / locations.length).toFixed(1),
    }

    const filteredLocations = locations.filter((location) => {
        const matchesSearch =
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.address.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || location.status === statusFilter
        const matchesCategory = categoryFilter === "all" || location.category === categoryFilter
        return matchesSearch && matchesStatus && matchesCategory
    })

    const handleViewDetails = (location: Location) => {
        setSelectedLocation(location)
        setIsDetailDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <LocationsAdminHeader isDialogOpen={isDialogOpen} onDialogOpenChange={setIsDialogOpen} />

            <LocationsStatsCards stats={stats} />

            <LocationsFilters
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                categoryFilter={categoryFilter}
                viewMode={viewMode}
                onSearchChange={setSearchQuery}
                onStatusFilterChange={setStatusFilter}
                onCategoryFilterChange={setCategoryFilter}
                onViewModeChange={setViewMode}
            />

            {viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredLocations.map((location, index) => (
                        <LocationCard
                            key={location.id}
                            location={location}
                            index={index}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            ) : (
                <LocationsTable locations={filteredLocations} onViewDetails={handleViewDetails} />
            )}

            <LocationDetailDialog
                isOpen={isDetailDialogOpen}
                onOpenChange={setIsDetailDialogOpen}
                location={selectedLocation}
            />
        </div>
    )
}
