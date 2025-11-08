"use client"

import { Card } from "@/shared/ui/card"
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

export default function EventList({
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
        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {events.map((event, index) => (
                <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
                                <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
                                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${getCategoryColor(event.category)}`}>
                                    {event.category}
                                </div>
                            </div>
                            <div className="flex-1 p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                                        <p className="text-muted-foreground text-sm">{event.description}</p>
                                    </div>
                                    {getStatusBadge(event.status)}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-orange-600" />
                                            <span className="font-medium">Người tham gia</span>
                                        </div>
                                        <span className="font-bold">
                                            {event.participants} / {event.maxParticipants}
                                        </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2.5">
                                        <div
                                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full transition-all"
                                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 mr-2" />
                                        {t("edit")}
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    )
}


