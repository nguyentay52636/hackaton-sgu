"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { Calendar, Clock, MapPin, Users, ChefHat, Star, Heart, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import EventRegistrationDialog from "./EventRegistrationDialog"
import { Event } from "./types"

interface EventCardProps {
    event: Event
    index?: number
    isFavorite: boolean
    isRegistered: boolean
    onToggleFavorite: (eventId: number) => void
    onRegister: (eventId: number) => void
    showTrendingBadge?: boolean
    showFullDetails?: boolean
}

export default function EventCard({
    event,
    index = 0,
    isFavorite,
    isRegistered,
    onToggleFavorite,
    onRegister,
    showTrendingBadge = false,
    showFullDetails = true,
}: EventCardProps) {
    const getCategoryLabel = (category: string) => {
        switch (category) {
            case "workshop":
                return "Workshop"
            case "cooking-class":
                return "Lớp học"
            case "food-tour":
                return "Tour"
            default:
                return category
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 * index }}
        >
            <Card className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    {showTrendingBadge ? (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                        </Badge>
                    ) : (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                            {getCategoryLabel(event.category)}
                        </Badge>
                    )}
                    <Button
                        size="icon"
                        variant="ghost"
                        className={`absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background ${showTrendingBadge ? "" : "opacity-0 group-hover:opacity-100 transition-opacity"
                            }`}
                        onClick={() => onToggleFavorite(event.id)}
                    >
                        <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{event.rating}</span>
                    </div>
                </div>

                <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                    </CardTitle>
                    <CardDescription className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                        </div>
                        {showFullDetails && (
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{event.location}</span>
                        </div>
                    </CardDescription>
                </CardHeader>

                <CardContent className={showFullDetails ? "space-y-4" : "space-y-3"}>
                    {showFullDetails && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ChefHat className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{event.host}</span>
                            </div>
                            <Badge variant="outline">{event.level}</Badge>
                        </div>
                    )}

                    <div className="space-y-2">
                        {showFullDetails ? (
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>
                                        {event.participants}/{event.maxParticipants}
                                    </span>
                                </div>
                                <span className="text-xs font-medium">
                                    {Math.round((event.participants / event.maxParticipants) * 100)}% đã đầy
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Đã đăng ký</span>
                                <span className="font-medium">
                                    {event.participants}/{event.maxParticipants}
                                </span>
                            </div>
                        )}
                        <Progress value={(event.participants / event.maxParticipants) * 100} className="h-2" />
                    </div>

                    <div className={`flex items-center justify-between ${showFullDetails ? "pt-2 border-t" : "pt-2"}`}>
                        <span className="text-lg font-bold text-primary">{event.price}</span>
                        {showFullDetails ? (
                            <EventRegistrationDialog
                                event={event}
                                isRegistered={isRegistered}
                                onRegister={onRegister}
                            />
                        ) : (
                            <Button size="sm" className="gap-2">
                                Đăng ký
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

