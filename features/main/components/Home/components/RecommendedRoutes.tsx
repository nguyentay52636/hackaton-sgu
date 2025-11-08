import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Clock, MapPin, Star, NavigationIcon } from "lucide-react"

export type RouteItem = {
    id: number
    name: string
    duration: string
    stops: number
    distance: string
    rating: number
    image: string
    highlights: string[]
    price: string
}

export function RecommendedRoutes({ routes }: { routes: RouteItem[] }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">Lộ trình gợi ý cho bạn</h2>
                <Link href="/map">
                    <Button variant="ghost" className="gap-2">
                        Xem bản đồ
                        <NavigationIcon className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.map((route) => (
                    <Card key={route.id} className="overflow-hidden my-6 p-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 cursor-pointer group">
                        <div className="relative h-48">
                            <img src={route.image || "/placeholder.svg"} alt={route.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg">{route.price}</Badge>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold text-xl mb-2">{route.name}</h3>
                                <div className="flex items-center gap-3 text-white/90 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {route.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {route.stops} điểm
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        {route.rating}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground mb-3">Điểm nổi bật:</p>
                            <div className="flex flex-wrap gap-2">
                                {route.highlights.map((highlight, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {highlight}
                                    </Badge>
                                ))}
                            </div>
                            <Button className="w-full mt-4 gap-2 cursor-pointer group">
                                <NavigationIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                Bắt đầu lộ trình
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


