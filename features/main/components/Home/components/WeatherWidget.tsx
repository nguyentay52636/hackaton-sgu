"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Droplets, Wind, Sun, Cloud, CloudRain } from "lucide-react"

export type ForecastItem = { time: string; temp: number; condition: string }
export type Weather = {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    forecast: ForecastItem[]
}

function getWeatherIcon(condition: string) {
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

export function WeatherWidget({ weather }: { weather: Weather }) {
    return (
        <Card className="border-2 shadow-xl bg-gradient-to-br from-blue-500/10 via-card to-cyan-500/10 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                            <Sun className="h-10 w-10 text-yellow-500" />
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold">{weather.temp}°C</span>
                                <span className="text-xl text-muted-foreground">{weather.condition}</span>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">Sài Gòn, Việt Nam</p>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Droplets className="h-4 w-4 text-blue-500" />
                                    <span>{weather.humidity}%</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Wind className="h-4 w-4 text-gray-500" />
                                    <span>{weather.windSpeed} km/h</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {weather.forecast.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-background/50 backdrop-blur-sm border min-w-[80px]"
                            >
                                <span className="text-xs font-medium text-muted-foreground">{item.time}</span>
                                {getWeatherIcon(item.condition)}
                                <span className="text-sm font-bold">{item.temp}°C</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 max-w-xs">
                        <p className="text-sm font-semibold text-primary mb-1">Gợi ý hôm nay</p>
                        <p className="text-xs text-muted-foreground">
                            Thời tiết nắng đẹp, phù hợp cho các quán ăn ngoài trời và tour ẩm thực đường phố
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


