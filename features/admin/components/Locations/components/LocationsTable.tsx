"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { MapPin, Star, Eye, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useAdminLanguage } from "@/features/admin/i18n"
import { Location } from "./types"

interface LocationsTableProps {
    locations: Location[]
    onViewDetails: (location: Location) => void
}

export default function LocationsTable({ locations, onViewDetails }: LocationsTableProps) {
    const { t } = useAdminLanguage()

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("restaurants")}</CardTitle>
                <CardDescription>{t("allLocations")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("image")}</TableHead>
                            <TableHead>{t("locationName")}</TableHead>
                            <TableHead>{t("address")}</TableHead>
                            <TableHead>{t("category")}</TableHead>
                            <TableHead>{t("rating")}</TableHead>
                            <TableHead>{t("status")}</TableHead>
                            <TableHead className="text-right">{t("actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map((location, index) => (
                            <motion.tr
                                key={location.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <TableCell>
                                    <img
                                        src={location.image || "/placeholder.svg"}
                                        alt={location.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{location.name}</div>
                                    <div className="text-sm text-muted-foreground">{location.phone}</div>
                                </TableCell>
                                <TableCell className="max-w-xs">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                        <span className="text-sm">{location.address}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{location.category}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-primary text-primary" />
                                        <span className="font-medium">{location.rating}</span>
                                        <span className="text-sm text-muted-foreground">({location.reviews})</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={location.status === "active" ? "default" : "secondary"}>
                                        {t(location.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onViewDetails(location)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

