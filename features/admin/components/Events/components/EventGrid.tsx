"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Calendar, Clock, Edit, MapPin, Trash2, Users } from "lucide-react"
import { motion } from "framer-motion"

type EventItem = {
    id: number
    name: string
    date: string
    time: string
    location: string
    participants: number
    maxParticipants: number
    status: string
    description: string
    image?: string
    category: string
}

export default function EventGrid({
    events,
    getStatusBadge,
    getCategoryColor,
    t,
}: {
    events: EventItem[]
    getStatusBadge: (status: string) => React.ReactNode
    getCategoryColor: (category: string) => string
    t: (k: string) => string
}) {
    return (
        <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {events.map((event, index) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={event.image || "/placeholder.svg"}
                                alt={event.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${getCategoryColor(event.category)}`}>
                                {event.category}
                            </div>
                            <div className="absolute top-3 right-3">{getStatusBadge(event.status)}</div>
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg line-clamp-1">{event.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-orange-600" />
                                <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-orange-600" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-orange-600" />
                                <span className="line-clamp-1">{event.location}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-orange-600" />
                                        <span className="font-medium">Người tham gia</span>
                                    </div>
                                    <span className="font-bold">
                                        {event.participants} / {event.maxParticipants}
                                    </span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                                    <motion.div
                                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                    <Edit className="h-4 w-4 mr-2" />
                                    {t("edit")}
                                </Button>
                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    )
}


