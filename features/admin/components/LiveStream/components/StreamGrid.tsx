"use client"

import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Calendar, CheckCircle2, Edit, Eye, Heart, MessageSquare, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"

type Livestream = {
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

export default function StreamGrid({
    livestreams,
    t,
    getStatusColor,
    getStatusIcon,
}: {
    livestreams: Livestream[]
    t: (k: string) => string
    getStatusColor: (s: string) => string
    getStatusIcon: (s: string) => React.ReactNode
}) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {livestreams.map((livestream, index) => (
                <motion.div key={livestream.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                            <img src={livestream.thumbnail || "/placeholder.svg"} alt={livestream.title} className="w-full h-48 object-cover" />
                            <Badge className={`absolute top-2 left-2 ${getStatusColor(livestream.status)} text-white flex items-center gap-1`}>
                                {getStatusIcon(livestream.status)}
                                {t(livestream.status)}
                            </Badge>
                            {livestream.status === "live" && (
                                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {livestream.viewers.toLocaleString()}
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg line-clamp-2">{livestream.title}</CardTitle>
                                    <CardDescription className="mt-1 line-clamp-2">{livestream.description}</CardDescription>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            {t("edit")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            {/* Delete icon imported in parent; keep visual only here */}
                                            {t("delete")}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <img src={livestream.chefAvatar || "/placeholder.svg"} alt={livestream.chef} className="w-8 h-8 rounded-full" />
                                <span className="text-sm font-medium">{livestream.chef}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    {/* duration icon is shown in parent; keep simple here */}
                                    {livestream.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(livestream.scheduledTime).toLocaleDateString("vi-VN")}
                                </div>
                            </div>

                            {livestream.status === "ended" && (
                                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                                    <div className="flex items-center gap-1 text-sm">
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                        <span>{livestream.peakViewers.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Heart className="h-4 w-4 text-red-500" />
                                        <span>{livestream.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <MessageSquare className="h-4 w-4 text-blue-500" />
                                        <span>{livestream.comments}</span>
                                    </div>
                                </div>
                            )}

                            {/* Action button kept at parent-level previously; you can drill a handler if needed */}
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}


