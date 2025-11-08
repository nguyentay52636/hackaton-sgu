import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card"
import { Calendar, MapPin, Users } from "lucide-react"

export type EventItem = {
    id: number
    title: string
    date: string
    time: string
    location: string
    participants: number
    maxParticipants: number
    price: string
}

export function EventsSection({ events }: { events: EventItem[] }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Sự kiện sắp diễn ra
                </h3>
                <Link href="/events">
                    <Button variant="ghost" className="gap-2">Xem tất cả</Button>
                </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
                        <CardHeader>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {event.date} • {event.time}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {event.location}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    {event.participants}/{event.maxParticipants} người tham gia
                                </div>
                                <div className="text-lg font-bold text-primary">{event.price}</div>
                            </div>
                            <Link href="/events">
                                <Button className="w-full gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Đăng ký ngay
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


