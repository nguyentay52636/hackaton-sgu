"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Star } from "lucide-react"

interface RestaurantItem {
    id: number
    name: string
    address: string
    image: string
    rating: number
}

export default function RestaurantList({ restaurants }: { restaurants: RestaurantItem[] }) {
    return (
        <Card className="border-2 shadow-xl">
            <CardHeader>
                <CardTitle>Nhà hàng khác</CardTitle>
                <CardDescription>Khám phá thêm nhà hàng với AR Preview</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {restaurants.map((restaurant) => (
                        <Card key={restaurant.id} className="cursor-pointer hover:shadow-lg transition-all border">
                            <CardContent className="p-4">
                                <div className="flex gap-3">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold truncate">{restaurant.name}</h4>
                                        <p className="text-sm text-muted-foreground truncate">{restaurant.address}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold">{restaurant.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}


