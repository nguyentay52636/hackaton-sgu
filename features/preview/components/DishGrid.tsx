"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"

interface DishItem {
    id: number
    name: string
    restaurant: string
    image: string
}

export default function DishGrid({ dishes }: { dishes: DishItem[] }) {
    return (
        <Card className="border-2 shadow-xl">
            <CardHeader>
                <CardTitle>Món ăn khác</CardTitle>
                <CardDescription>Khám phá thêm món ăn với AR Preview</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    {dishes.map((dish) => (
                        <Card key={dish.id} className="cursor-pointer hover:shadow-lg transition-all border">
                            <CardContent className="p-3">
                                <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-muted">
                                    <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-semibold text-sm truncate">{dish.name}</h4>
                                <p className="text-xs text-muted-foreground truncate">{dish.restaurant}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}


