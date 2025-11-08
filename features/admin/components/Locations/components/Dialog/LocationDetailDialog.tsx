"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog"
import { Badge } from "@/shared/ui/badge"
import { MapPin, Phone, Clock, Star } from "lucide-react"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Location } from "../types"

interface LocationDetailDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    location: Location | null
}

export default function LocationDetailDialog({ isOpen, onOpenChange, location }: LocationDetailDialogProps) {
    const { t } = useAdminLanguage()

    if (!location) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Chi tiết địa điểm</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="relative h-64 rounded-lg overflow-hidden">
                        <img
                            src={location.image || "/placeholder.svg"}
                            alt={location.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <h3 className="text-2xl font-bold">{location.name}</h3>
                            <Badge variant="outline" className="mt-2">
                                {location.category}
                            </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{location.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{location.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{location.openTime}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-primary text-primary" />
                                    <span className="text-lg font-bold">{location.rating}</span>
                                    <span className="text-sm text-muted-foreground">({location.reviews} đánh giá)</span>
                                </div>
                                <div>
                                    <Badge variant={location.status === "active" ? "default" : "secondary"}>
                                        {t(location.status)}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Mô tả</h4>
                            <p className="text-sm text-muted-foreground">{location.description}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Tọa độ</h4>
                            <div className="flex gap-4 text-sm">
                                <span>Vĩ độ: {location.lat}</span>
                                <span>Kinh độ: {location.lng}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

