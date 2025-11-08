"use client"

import React, { useEffect } from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { Star, MapPin, NavigationIcon, Navigation, CloudRain, Wind, Droplets } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { useWeatherStore } from '@/stores/weather-store'
import { useLocationStore } from '@/stores/location-store'

export default function Weather() {
    const { userLocation, nearbyRestaurants, requestLocation, isLoadingLocation } = useLocationStore()
    const { weather, fetchWeather, isLoading: isLoadingWeather } = useWeatherStore()

    useEffect(() => {
        const initializeData = async () => {
            await requestLocation()
            if (userLocation) {
                await fetchWeather(userLocation.latitude, userLocation.longitude)
            } else {
                // Default to Saigon coordinates
                await fetchWeather(10.8231, 106.6297)
            }
        }
        initializeData()
    }, [])

    return (
        <>
            <section className="py-16 bg-gradient-to-b from-muted/30 to-background border-b">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Weather Widget */}
                        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 hover:shadow-xl transition-shadow">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Thời tiết hôm nay</h3>
                                        <p className="text-sm text-muted-foreground">Thành phố Hồ Chí Minh</p>
                                    </div>
                                    {weather && <div className="text-5xl">{weather.icon}</div>}
                                </div>

                                {isLoadingWeather ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                    </div>
                                ) : weather ? (
                                    <>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-6xl font-bold">{weather.temperature}°</span>
                                            <span className="text-2xl text-muted-foreground">C</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <CloudRain className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Độ ẩm</p>
                                                    <p className="font-semibold">{weather.humidity}%</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Wind className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Gió</p>
                                                    <p className="font-semibold">{weather.windSpeed} km/h</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Droplets className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Điều kiện</p>
                                                    <p className="font-semibold text-sm">{weather.condition}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <p className="text-sm font-semibold mb-3">Dự báo 4 giờ tới</p>
                                            <div className="grid grid-cols-4 gap-2">
                                                {weather.forecast.map((item, index) => (
                                                    <div key={index} className="text-center">
                                                        <p className="text-xs text-muted-foreground mb-1">{item.time}</p>
                                                        <div className="text-2xl mb-1">{item.icon}</div>
                                                        <p className="text-sm font-semibold">{item.temperature}°</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-center text-muted-foreground">Không thể tải thông tin thời tiết</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Location Widget */}
                        <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-2 hover:shadow-xl transition-shadow">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Quán ăn gần bạn</h3>
                                        <p className="text-sm text-muted-foreground">Dựa trên vị trí của bạn</p>
                                    </div>
                                    <Navigation className="h-8 w-8 text-primary" />
                                </div>

                                {isLoadingLocation ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                    </div>
                                ) : nearbyRestaurants.length > 0 ? (
                                    <div className="space-y-4">
                                        {nearbyRestaurants.slice(0, 3).map((restaurant) => (
                                            <div
                                                key={restaurant.id}
                                                className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-semibold mb-1">{restaurant.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <Star className="h-4 w-4 fill-primary text-primary" />
                                                        <span className="font-semibold">{restaurant.rating}</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">{restaurant.distance} km</p>
                                                </div>
                                            </div>
                                        ))}
                                        <Button asChild className="w-full mt-4">
                                            <Link href="/map">
                                                Xem tất cả trên bản đồ
                                                <MapPin className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground mb-4">Cho phép truy cập vị trí để xem quán ăn gần bạn</p>
                                        <Button onClick={requestLocation}>
                                            <Navigation className="mr-2 h-4 w-4" />
                                            Bật định vị
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}
