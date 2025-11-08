"use client"

import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { ChefHat, MapPin, Star } from "lucide-react"

interface DishDetailsCardProps {
    name: string
    restaurant: string
    description: string
    price: string
    rating: number
}

export default function DishDetailsCard({ name, restaurant, description, price, rating }: DishDetailsCardProps) {
    return (
        <Card className="border-2 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl">{name}</CardTitle>
                <CardDescription className="text-base">{restaurant}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">{description}</p>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">{rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-base px-3 py-1">
                        {price}
                    </Badge>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button className="flex-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        Xem vị trí
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                        <ChefHat className="h-4 w-4 mr-2" />
                        Đặt món
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


