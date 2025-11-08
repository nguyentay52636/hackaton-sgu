"use client"

import { useState, useEffect } from "react"
import { Button } from "@/shared/ui/button"
import {
    ChefHat,
    Video,
    Star,
    MapPin,
    Calendar,
    Sun,
    CloudRain,
    Cloud,
    TrendingUp,
    Heart,
    NavigationIcon,
    Box,
} from "lucide-react"
import { Input } from "@/shared/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { WeatherWidget } from "./components/WeatherWidget"
import { CategoriesGrid } from "./components/CategoriesGrid"
import { SearchFilter } from "./components/SearchFilter"
import { RecommendedRoutes as RecommendedRoutesSection } from "./components/RecommendedRoutes"
import { RestaurantsListSection } from "./components/RestaurantsListSection"
import { LivestreamsSection } from "./components/LivestreamsSection"
import { ARPreviewSection } from "./components/ARPreviewSection"
import { EventsSection } from "./components/EventsSection"
import { QuickAccessGrid } from "./components/QuickAccessGrid"
import { categories, recommendedRoutes, featuredRestaurants, liveStreams, upcomingEvents } from "./data"
import { useTranslation } from '@/shared/contexts/TranslationContext'

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [weather, setWeather] = useState({
        temp: 32,
        condition: "Nắng",
        humidity: 65,
        windSpeed: 12,
        forecast: [
            { time: "12:00", temp: 32, condition: "sunny" },
            { time: "15:00", temp: 34, condition: "sunny" },
            { time: "18:00", temp: 30, condition: "cloudy" },
            { time: "21:00", temp: 28, condition: "rain" },
        ],
    })

    const { t } = useTranslation()

    useEffect(() => {
        const fetchWeather = async () => {
            console.log("[v0] Fetching weather data...")
        }
        fetchWeather()
    }, [])

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case "sunny":
                return <Sun className="h-5 w-5 text-yellow-500" />
            case "cloudy":
                return <Cloud className="h-5 w-5 text-gray-500" />
            case "rain":
                return <CloudRain className="h-5 w-5 text-blue-500" />
            default:
                return <Cloud className="h-5 w-5 text-gray-400" />
        }
    }


    return (
        <div>
            <main className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            {t('homePage.welcomeToSaigon')}
                        </h1>
                        <p className="text-muted-foreground text-lg">{t('homePage.discoverCityCuisine')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                            <Heart className="h-5 w-5" />
                            {t('homePage.favorites')}
                        </Button>
                        <Button size="lg" className="gap-2 shadow-lg">
                            <NavigationIcon className="h-5 w-5" />
                            {t('homePage.myRoute')}
                        </Button>
                    </div>
                </div>

                <WeatherWidget weather={weather} />

                <CategoriesGrid
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                <SearchFilter searchQuery={searchQuery} onChange={setSearchQuery} />

                <RecommendedRoutesSection routes={recommendedRoutes} />

                {/* Main Content Tabs */}
                <Tabs defaultValue="restaurants" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 h-14">
                        <TabsTrigger value="restaurants" className="text-base gap-2">
                            <ChefHat className="h-5 w-5" />
                            {t('homePage.restaurants')}
                        </TabsTrigger>
                        <TabsTrigger value="livestream" className="text-base gap-2">
                            <Video className="h-5 w-5" />
                            {t('livestream')}
                        </TabsTrigger>
                        <TabsTrigger value="ar" className="text-base gap-2">
                            <Box className="h-5 w-5" />
                            {t('arPreview')}
                        </TabsTrigger>
                        <TabsTrigger value="events" className="text-base gap-2">
                            <Calendar className="h-5 w-5" />
                            {t('events')}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="restaurants" className="space-y-4">
                        <RestaurantsListSection restaurants={featuredRestaurants} />
                    </TabsContent>

                    <TabsContent value="livestream" className="space-y-4">
                        <LivestreamsSection streams={liveStreams} />
                    </TabsContent>

                    <TabsContent value="ar" className="space-y-4">
                        <ARPreviewSection
                            items={featuredRestaurants
                                .filter((r) => r.hasAR)
                                .map((r) => ({ id: r.id, name: r.name, image: r.image, cuisine: r.cuisine }))}
                        />
                    </TabsContent>

                    <TabsContent value="events" className="space-y-4">
                        <EventsSection events={upcomingEvents} />
                    </TabsContent>
                </Tabs>

                <QuickAccessGrid />
            </main>
        </div>
    )
}
