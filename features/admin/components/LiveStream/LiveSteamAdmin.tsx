"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent } from "@/shared/ui/card"
import { Search, Eye, MessageSquare, Heart, Clock, Play, Calendar, CheckCircle2, Video } from "lucide-react"
import Header from "./components/Header"
import StatsCards from "./components/StatsCards"
import FiltersBar from "./components/FiltersBar"
import StreamGrid from "./components/StreamGrid"

interface Livestream {
    id: string
    title: string
    description: string
    chef: string
    chefAvatar: string
    thumbnail: string
    status: "live" | "scheduled" | "ended"
    scheduledTime: string
    duration: string
    viewers: number
    peakViewers: number
    comments: number
    likes: number
    shares: number
    streamUrl: string
}

export default function LiveSteamAdmin() {
    const { t } = useAdminLanguage()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "live" | "scheduled" | "ended">("all")

    const [livestreams, setLivestreams] = useState<Livestream[]>([
        {
            id: "1",
            title: "Cách làm Phở Bò truyền thống",
            description: "Hướng dẫn chi tiết cách nấu nước dùng phở thơm ngon",
            chef: "Chef Nguyễn Văn A",
            chefAvatar: "/placeholder.svg?height=40&width=40",
            thumbnail: "/pho-cooking-class.jpg",
            status: "live",
            scheduledTime: "2024-01-15 10:00",
            duration: "45 phút",
            viewers: 1234,
            peakViewers: 1500,
            comments: 89,
            likes: 456,
            shares: 23,
            streamUrl: "https://stream.example.com/live1",
        },
        {
            id: "2",
            title: "Bí quyết làm Bánh Mì giòn tan",
            description: "Chia sẻ công thức làm bánh mì Sài Gòn đặc trưng",
            chef: "Chef Trần Thị B",
            chefAvatar: "/placeholder.svg?height=40&width=40",
            thumbnail: "/banh-mi-close-up.jpg",
            status: "scheduled",
            scheduledTime: "2024-01-16 14:00",
            duration: "60 phút",
            viewers: 0,
            peakViewers: 0,
            comments: 0,
            likes: 0,
            shares: 0,
            streamUrl: "",
        },
        {
            id: "3",
            title: "Nấu Cơm Tấm Sườn Bì Chả",
            description: "Hướng dẫn làm món cơm tấm hoàn chỉnh",
            chef: "Chef Lê Văn C",
            chefAvatar: "/placeholder.svg?height=40&width=40",
            thumbnail: "/com-tam-close-up.jpg",
            status: "ended",
            scheduledTime: "2024-01-14 16:00",
            duration: "50 phút",
            viewers: 0,
            peakViewers: 2100,
            comments: 156,
            likes: 892,
            shares: 45,
            streamUrl: "https://stream.example.com/replay3",
        },
    ])

    const stats = {
        total: livestreams.length,
        live: livestreams.filter((l) => l.status === "live").length,
        scheduled: livestreams.filter((l) => l.status === "scheduled").length,
        ended: livestreams.filter((l) => l.status === "ended").length,
        totalViewers: livestreams.reduce((sum, l) => sum + l.peakViewers, 0),
    }

    const filteredLivestreams = livestreams.filter((livestream) => {
        const matchesSearch =
            livestream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            livestream.chef.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || livestream.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "live":
                return "bg-red-500"
            case "scheduled":
                return "bg-blue-500"
            case "ended":
                return "bg-gray-500"
            default:
                return "bg-gray-500"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "live":
                return <Play className="h-3 w-3" />
            case "scheduled":
                return <Calendar className="h-3 w-3" />
            case "ended":
                return <CheckCircle2 className="h-3 w-3" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <Header />

            <StatsCards stats={stats} />

            <FiltersBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <StreamGrid livestreams={filteredLivestreams} t={t} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />

            {filteredLivestreams.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Video className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">{t("noData")}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
