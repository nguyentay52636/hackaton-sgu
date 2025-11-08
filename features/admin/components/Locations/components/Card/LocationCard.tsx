"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { MapPin, Phone, Clock, Star, Edit, Trash2, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Location } from "../types"

interface LocationCardProps {
    location: Location
    index: number
    onViewDetails: (location: Location) => void
}

export default function LocationCard({ location, index, onViewDetails }: LocationCardProps) {
    const { t } = useAdminLanguage()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={location.image || "/placeholder.svg"}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                        <Badge variant={location.status === "active" ? "default" : "secondary"}>
                            {t(location.status)}
                        </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <Button variant="secondary" size="sm" onClick={() => onViewDetails(location)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                        </Button>
                    </div>
                </div>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <CardTitle className="text-lg">{location.name}</CardTitle>
                            <Badge variant="outline" className="mt-2">
                                {location.category}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground line-clamp-1">{location.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{location.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{location.openTime}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-medium">{location.rating}</span>
                            <span className="text-sm text-muted-foreground">({location.reviews})</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

