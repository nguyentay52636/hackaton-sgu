"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { MapPin, Move, Star } from "lucide-react"

interface RestaurantDetailsCardProps {
    name: string
    address: string
    description: string
    rating: number
}

export default function RestaurantDetailsCard({ name, address, description, rating }: RestaurantDetailsCardProps) {
    return (
        <Card className="border-2 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl">{name}</CardTitle>
                <CardDescription className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {address}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">{description}</p>

                <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{rating}</span>
                    <span className="text-muted-foreground ml-2">(1,234 đánh giá)</span>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button className="flex-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        Chỉ đường
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                        <Move className="h-4 w-4 mr-2" />
                        Đặt bàn
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


