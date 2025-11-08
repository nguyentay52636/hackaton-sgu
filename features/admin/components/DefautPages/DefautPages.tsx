"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Input } from "@/shared/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useAdminLanguage } from "@/features/admin/i18n"
import {
    ChefHat,
    Users,
    Video,
    Star,
    Search,
    Plus,
} from "lucide-react"
import StatsGrid from "./components/StatsGrid"
import RestaurantsTable from "./components/RestaurantsTable"
import UsersTable from "./components/UsersTable"
import ReviewsList from "./components/ReviewsList"
import AnalyticsGrid from "./components/AnalyticsGrid"
import { restaurants, users, pendingReviews } from "./data"
export default function DefautPages() {
    const [searchQuery, setSearchQuery] = useState("")
    const { t } = useAdminLanguage()

    const stats = [
        { label: t("totalRestaurants"), value: "1,234", change: "+12%", trend: "up", icon: ChefHat },
        { label: t("activeUsers"), value: "45.2K", change: "+8%", trend: "up", icon: Users },
        { label: t("todayLivestreams"), value: "89", change: "+23%", trend: "up", icon: Video },
        { label: t("pendingReviews"), value: "47", change: "-5%", trend: "down", icon: Star },
    ]



    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
            active: { variant: "default", label: t("active") },
            pending: { variant: "secondary", label: t("pending") },
            suspended: { variant: "destructive", label: t("suspended") },
        }
        const config = variants[status] || variants.active
        return <Badge variant={config.variant}>{config.label}</Badge>
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{t("systemOverview")}</h1>
                    <p className="text-muted-foreground">{t("manageAndMonitor")}</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addRestaurant")}
                </Button>
            </div>
            {/* Stats Grid */}
            <StatsGrid stats={stats} />
            {/* Main Content Tabs */}
            <Tabs defaultValue="restaurants" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="restaurants">{t("restaurants")}</TabsTrigger>
                    <TabsTrigger value="users">{t("usersTab")}</TabsTrigger>
                    <TabsTrigger value="reviews">{t("reviewsTab")}</TabsTrigger>
                    <TabsTrigger value="analytics">{t("analyticsTab")}</TabsTrigger>
                </TabsList>
                {/* Restaurants Tab */}
                <TabsContent value="restaurants">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>{t("manageRestaurants")}</CardTitle>
                                    <CardDescription>{t("allRestaurants")}</CardDescription>
                                </div>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder={t("search")}
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <RestaurantsTable restaurants={restaurants.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))} getStatusBadge={getStatusBadge} />
                        </CardContent>
                    </Card>
                </TabsContent>
                {/* Users Tab */}
                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>{t("manageUsers")}</CardTitle>
                                    <CardDescription>{t("allUsers")}</CardDescription>
                                </div>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder={t("search")} className="pl-10" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <UsersTable users={users} getStatusBadge={getStatusBadge} t={t} />
                        </CardContent>
                    </Card>
                </TabsContent>
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                    <ReviewsList pendingReviews={pendingReviews} t={t} />
                </TabsContent>
                {/* Analytics Tab */}
                <TabsContent value="analytics">
                    <AnalyticsGrid t={t} />
                </TabsContent>
            </Tabs>
        </div>
    )
}