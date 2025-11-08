import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Box } from "lucide-react"

export type ARRestaurant = {
    id: number
    name: string
    image: string
    cuisine: string
}

export function ARPreviewSection({ items }: { items: ARRestaurant[] }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Box className="h-5 w-5 text-primary" />
                    Xem trước 3D
                </h3>
                <Link href="/ar-preview">
                    <Button variant="ghost" className="gap-2">Xem tất cả</Button>
                </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((restaurant) => (
                    <Card key={restaurant.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 cursor-pointer group">
                        <div className="relative h-48">
                            <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg gap-1">
                                <Box className="h-3 w-3" />
                                3D
                            </Badge>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{restaurant.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>
                            <Link href="/ar-preview">
                                <Button className="w-full gap-2">
                                    <Box className="h-4 w-4" />
                                    Xem 3D
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}


