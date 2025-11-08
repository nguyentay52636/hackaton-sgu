"use client"

import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import EventCard from "./EventCard"
import { Event } from "./types"

interface TrendingEventsSectionProps {
    events: Event[]
    favoriteEvents: number[]
    registeredEvents: number[]
    onToggleFavorite: (eventId: number) => void
    onRegister: (eventId: number) => void
}

export default function TrendingEventsSection({
    events,
    favoriteEvents,
    registeredEvents,
    onToggleFavorite,
    onRegister,
}: TrendingEventsSectionProps) {
    if (events.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
        >
            <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Sự kiện đang hot</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {events.slice(0, 3).map((event, index) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        index={index}
                        isFavorite={favoriteEvents.includes(event.id)}
                        isRegistered={registeredEvents.includes(event.id)}
                        onToggleFavorite={onToggleFavorite}
                        onRegister={onRegister}
                        showTrendingBadge={true}
                        showFullDetails={false}
                    />
                ))}
            </div>
        </motion.div>
    )
}

