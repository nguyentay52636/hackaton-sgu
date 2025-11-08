"use client"

import { useState } from "react"
import { Badge } from "@/shared/ui/badge"
import { useAdminLanguage } from "@/features/admin/i18n"
import { AnimatePresence } from "framer-motion"
import EventsHeader from "./components/EventsHeader"
import StatsCards from "./components/StatsCards"
import FiltersBar from "./components/FiltersBar"
import EventGrid from "./components/EventGrid"
import EventList from "./components/EventList"
import { events } from "./data"
export default function Events() {
    const { t } = useAdminLanguage()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")


    const stats = {
        total: events.length,
        upcoming: events.filter((e) => e.status === "upcoming").length,
        ongoing: events.filter((e) => e.status === "ongoing").length,
        completed: events.filter((e) => e.status === "completed").length,
        totalParticipants: events.reduce((sum, e) => sum + e.participants, 0),
    }

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || event.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: "default" | "secondary" | "outline"; label: string; color: string }> = {
            upcoming: { variant: "default", label: "Sắp diễn ra", color: "bg-blue-500" },
            ongoing: { variant: "secondary", label: "Đang diễn ra", color: "bg-green-500" },
            completed: { variant: "outline", label: "Đã kết thúc", color: "bg-gray-500" },
        }
        const config = variants[status] || variants.upcoming
        return (
            <Badge variant={config.variant} className="font-medium">
                {config.label}
            </Badge>
        )
    }

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            Festival: "bg-gradient-to-r from-orange-500 to-red-500",
            Workshop: "bg-gradient-to-r from-blue-500 to-cyan-500",
            "Night Market": "bg-gradient-to-r from-purple-500 to-pink-500",
            Conference: "bg-gradient-to-r from-green-500 to-emerald-500",
        }
        return colors[category] || "bg-gradient-to-r from-gray-500 to-slate-500"
    }

    return (
        <div className="space-y-6">
            <EventsHeader />
            <StatsCards stats={stats} />
            <FiltersBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <AnimatePresence mode="wait">
                {viewMode === "grid" ? (
                    <EventGrid events={filteredEvents} getStatusBadge={getStatusBadge} getCategoryColor={getCategoryColor} t={t} />
                ) : (
                    <EventList events={filteredEvents} getStatusBadge={getStatusBadge} getCategoryColor={getCategoryColor} t={t} />
                )}
            </AnimatePresence>
        </div>
    )
}
