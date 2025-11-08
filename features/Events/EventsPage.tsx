"use client"

import { useState } from "react"
import { events } from "@/features/Events/components/data"
import {
    EventsPageHeader,
    TrendingEventsSection,
    EventSearchAndFilter,
    EventCategoryTabs,
    EventCard,
    EmptyEventsState,
} from "@/features/Events/components"

export default function EventsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [registeredEvents, setRegisteredEvents] = useState<number[]>([])
    const [favoriteEvents, setFavoriteEvents] = useState<number[]>([])

    const filteredEvents = events.filter((event) => {
        const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
        const matchesSearch =
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const trendingEvents = events.filter((event) => event.isTrending)

    const handleRegister = (eventId: number) => {
        if (registeredEvents.includes(eventId)) {
            setRegisteredEvents(registeredEvents.filter((id) => id !== eventId))
        } else {
            setRegisteredEvents([...registeredEvents, eventId])
        }
    }

    const toggleFavorite = (eventId: number) => {
        if (favoriteEvents.includes(eventId)) {
            setFavoriteEvents(favoriteEvents.filter((id) => id !== eventId))
        } else {
            setFavoriteEvents([...favoriteEvents, eventId])
        }
    }

    return (
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto space-y-8">
                <EventsPageHeader />

                <TrendingEventsSection
                    events={trendingEvents}
                    favoriteEvents={favoriteEvents}
                    registeredEvents={registeredEvents}
                    onToggleFavorite={toggleFavorite}
                    onRegister={handleRegister}
                />

                <EventSearchAndFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                <EventCategoryTabs
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredEvents.map((event, index) => (
                            <EventCard
                                        key={event.id}
                                event={event}
                                index={index}
                                isFavorite={favoriteEvents.includes(event.id)}
                                isRegistered={registeredEvents.includes(event.id)}
                                onToggleFavorite={toggleFavorite}
                                onRegister={handleRegister}
                                showTrendingBadge={false}
                                showFullDetails={true}
                            />
                                ))}
                            </div>
                </EventCategoryTabs>

                {filteredEvents.length === 0 && <EmptyEventsState />}
                </div>
            </main>
    )
}
