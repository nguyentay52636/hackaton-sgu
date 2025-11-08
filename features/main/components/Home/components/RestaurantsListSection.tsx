import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Star, MapPin, Video, Box, Heart } from "lucide-react"

export type Restaurant = {
    id: number
    name: string
    cuisine: string
    rating: number
    reviews: number
    image: string
    district: string
    distance: string
    priceRange: string
    isOpen: boolean
    hasLive: boolean
    hasAR: boolean
}

export function RestaurantsListSection({ restaurants }: { restaurants: Restaurant[] }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Nhà hàng nổi bật</h3>
                <Link href="/explore">
                    <Button variant="ghost" className="gap-2">Xem tất cả</Button>
                </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {restaurants.map((restaurant) => (
                    <Card key={restaurant.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 cursor-pointer group">
                        <div className="flex gap-4 p-4">
                            <div className="relative flex-shrink-0">
                                <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="w-32 h-32 rounded-xl object-cover shadow-lg group-hover:shadow-2xl transition-shadow" />
                                {restaurant.isOpen ? (
                                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white shadow-lg">Đang mở</Badge>
                                ) : (
                                    <Badge className="absolute -top-2 -right-2 bg-gray-500 text-white shadow-lg">Đã đóng</Badge>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors mb-1">{restaurant.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-bold">{restaurant.rating}</span>
                                        <span className="text-xs text-muted-foreground">({restaurant.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {restaurant.district} • {restaurant.distance}
                                    </div>
                                    <div className="text-sm font-semibold text-primary">{restaurant.priceRange}</div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    {restaurant.hasLive && (
                                        <Badge variant="destructive" className="text-xs gap-1">
                                            <Video className="h-3 w-3" />
                                            Live
                                        </Badge>
                                    )}
                                    {restaurant.hasAR && (
                                        <Badge variant="secondary" className="text-xs gap-1">
                                            <Box className="h-3 w-3" />
                                            AR
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="px-4 pb-4 flex gap-2">
                            <Link href={`/restaurant/${restaurant.id}`} className="flex-1">
                                <Button className="w-full" size="sm">Chi tiết</Button>
                            </Link>
                            <Button variant="outline" size="sm">
                                <Heart className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}


